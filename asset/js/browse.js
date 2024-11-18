const browseScripts = () => {
    const resources = document.querySelectorAll('.resources');

    resources.forEach((resourcesSet, index) => {
        const resourceItems = resourcesSet.querySelectorAll('.resource');
        const layoutToggles = resourcesSet.parentElement.querySelectorAll('.layout-toggle button');

        const initMasonryGrid = () => {
            if (resourcesSet.classList.contains('resource-grid')) {
                // Masonry
                const createMasonryInstance = () => {
                    var msnry = new Masonry(resourcesSet, {
                        itemSelector: '.resource',
                        columnWidth: '.grid-sizer',
                        gutter: '.gutter-sizer',
                        percentPosition: true,
                    });

                    resourcesSet.style.opacity = 1;
                }

                if (document.readyState === 'complete') {
                    createMasonryInstance();
                } else {
                    window.onload = function () {
                        createMasonryInstance();
                    }
                }
            }
        }

        initMasonryGrid();

        layoutToggles.forEach((layoutToggle) => {
            layoutToggle.addEventListener('click', (e) => {
                const layoutToggleDisabled = e.currentTarget.parentElement.querySelector('.layout-toggle button:disabled');
                layoutToggleDisabled.removeAttribute('disabled');

                const url = new URL(window.location.href);
                url.searchParams.set('view', e.currentTarget.classList);
                window.history.pushState({}, '', url);
                const navLinks = document.querySelectorAll('.pager-wrapper a.previous, .pager-wrapper a.next');
                navLinks.forEach((navLink) => {
                    let navLinkUrl = new URL(navLink.href);
                    navLinkUrl.searchParams.set('view', e.currentTarget.classList);
                    navLink.href = navLinkUrl.toString();
                });

                e.currentTarget.setAttribute('disabled', true);
                resourcesSet.classList.toggle('resource-list');
                resourcesSet.classList.toggle('resource-grid');

                resourceItems.forEach((resource) => {
                    resource.classList.toggle('media-object');
                    const thumbnailWithDecoration = resource.querySelector('.resource__thumbnail.decoration');
                    if (thumbnailWithDecoration) {
                        thumbnailWithDecoration.classList.toggle('decoration--thumbnail');
                    }
                        
                    const resourceMeta = resource.querySelector('.resource-meta');
                    if (resourceMeta) {
                        resourceMeta.classList.toggle('media-object-section');
                    }

                    const resourceImage = resource.querySelector('.resource-image');
                    if (resourceImage) {
                        resourceImage.classList.toggle('media-object-section');
                    }
                });

                initMasonryGrid();
            });
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', browseScripts);
} else {
    browseScripts();
}
