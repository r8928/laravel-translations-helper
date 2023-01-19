
<?php

require_once './vendor/autoload.php';

use Stichoza\GoogleTranslate\GoogleTranslate;
use Illuminate\Support\Str;

$string = trim(urldecode($_GET['string'] ?? ''));

$sourcelang = trim(urldecode($_GET['sourcelang'] ?? 'ar'));
$targetlang = $sourcelang === 'ar' ? 'en' : 'ar';

if ($string) {
    $tr = GoogleTranslate::trans($string, $targetlang, $sourcelang);

    $slugged = $sourcelang === 'ar' ? $tr : $string;

    $slugged = (string) Str::of($slugged)->lower()->kebab();

    $translation = "'{$slugged}' => '{$string}',
'{$slugged}' => '{$tr}',";;

    $surround_with = trim(urldecode($_GET['surround_with'] ?? ''));
    if ($surround_with) {
        $surround_with = "{{__('" . $surround_with . $slugged . "')}}";
    }

    echo json_encode(compact('translation', 'surround_with', 'sourcelang', 'targetlang', 'slugged'));
}

echo '';

?>