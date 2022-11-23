
<?php

require_once './vendor/autoload.php';

use Stichoza\GoogleTranslate\GoogleTranslate;
use Illuminate\Support\Str;

$string = trim(urldecode($_GET['string'] ?? ''));

if ($string) {
    $tr = GoogleTranslate::trans($string, 'en');

    $slugged = (string) Str::of($tr)->lower()->kebab();

    $out = "'{$slugged}' => '{$string}',
'{$slugged}' => '{$tr}',";

    echo $out;
}

echo '';

?>