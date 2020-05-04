<?php
$queryUrl = 'https://b24-065n7z.bitrix24.ru/rest/1/d348kg5rogjojkdh/crm.lead.add.json';
$queryData = http_build_query(array(
    'fields' => array(
        'TITLE' => 'Заявка с формы',
        'STATUS_ID' => 'IN_PROCESS',
        'SOURCE_ID' => 'WEB',
        'NAME' => $_POST["name"],
        'POST' => $_POST["post"],
        'PHONE_MOBILE' => $_POST["phone"],
        'EMAIL_WORK' => $_POST["email"],

    ),
    'params' => array("REGISTER_SONET_EVENT" => "Y")
));


$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_POST => 1,
    CURLOPT_HEADER => 0,
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $queryUrl,
    CURLOPT_POSTFIELDS => $queryData,
));
$result = curl_exec($curl);
curl_close($curl);

$queryAddProductUrl = 'https://b24-065n7z.bitrix24.ru/rest/1/d348kg5rogjojkdh/crm.lead.productrows.set.json';
  $queryAddProductData = http_build_query(
    array(
      'id' => $result['result'],
      'rows' => array(
        array(
          'PRODUCT_ID' => '2',
          'PRICE' => 100,
          'QUANTITY' => 1
        ),
      ),
    )
  );
  $curlAdd = curl_init();

  curl_setopt_array($curlAdd, array(
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_POST => 1,
    CURLOPT_HEADER => 0,
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $queryAddProductUrl,
    CURLOPT_POSTFIELDS => $queryAddProductData,
    ));

    $resultAddProduct = curl_exec($curlAdd);
    curl_close($curlAdd);
    $resultAddProduct = json_decode($resultAddProduct, 1);
?>

