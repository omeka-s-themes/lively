<?php 
namespace OmekaTheme\Helper;

use Laminas\View\Helper\AbstractHelper;

class GetSVG extends AbstractHelper
{

    /**
     * Get SVG Markup.
     *
     * @param string $name The SVG name.
     * @return string
     */
    public function __invoke($name)
    {
        if (!$name) {
            return '';
        }

        $view = $this->getView();
        
        $filePath = $view->assetUrl("img/{$name}.svg", null, false, true, true);
        return file_get_contents($filePath);
    }
}
