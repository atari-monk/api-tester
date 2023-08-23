#paths
$root = 'C:\atari-monk\Code\api-tester\'
$projPath = $root + 'api\'
$build = 'build\'
$package = 'package.json'
$version = "1.0.0"
$pack = "atari-monk-api-tester-api-" + $version + ".tgz"
#copy package.json to build
Set-Location $projPath
Copy-Item ($projPath + $package) ($projPath + $build)
#pack
Set-Location ($projPath + $build)
npm pack
#install in lib
$libPath = $root + "lib\"
Copy-Item ($projPath + $build + $pack) $libPath
Set-Location $libPath
npm i (Get-Item $pack).Name
<#
#install in tests
$testsPath = $root + "tests\"
Copy-Item ($projPath + $build + $pack) $testsPath
Set-Location $testsPath
npm i (Get-Item $pack).Name
#>
<#
#clean files
#Remove-Item ($projPath + $build + $pack)
#Remove-Item ($libPath + $pack)
#Remove-Item ($testsPath + $pack)
#>