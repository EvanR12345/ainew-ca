param(
  [Parameter(Mandatory = $true)][string]$Source,
  [Parameter(Mandatory = $true)][string]$Destination
)

Add-Type -AssemblyName System.Drawing

$sourceImage = [System.Drawing.Image]::FromFile($Source)
try {
  $targetRatio = 16.0 / 9.0
  $sourceRatio = $sourceImage.Width / $sourceImage.Height

  if ($sourceRatio -gt $targetRatio) {
    $cropHeight = $sourceImage.Height
    $cropWidth = [int][Math]::Round($cropHeight * $targetRatio)
    $cropX = [int][Math]::Floor(($sourceImage.Width - $cropWidth) / 2)
    $cropY = 0
  } else {
    $cropWidth = $sourceImage.Width
    $cropHeight = [int][Math]::Round($cropWidth / $targetRatio)
    $cropX = 0
    $cropY = [int][Math]::Floor(($sourceImage.Height - $cropHeight) / 2)
  }

  $bitmap = [System.Drawing.Bitmap]::new(1200, 675)
  try {
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
      $graphics.Clear([System.Drawing.Color]::White)
      $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $destinationRectangle = [System.Drawing.Rectangle]::new(0, 0, 1200, 675)
      $sourceRectangle = [System.Drawing.Rectangle]::new($cropX, $cropY, $cropWidth, $cropHeight)
      $graphics.DrawImage($sourceImage, $destinationRectangle, $sourceRectangle, [System.Drawing.GraphicsUnit]::Pixel)
    } finally {
      $graphics.Dispose()
    }

    $directory = Split-Path -Parent $Destination
    if (-not (Test-Path -LiteralPath $directory)) {
      New-Item -ItemType Directory -Path $directory | Out-Null
    }

    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq "image/jpeg"
    $qualityEncoder = [System.Drawing.Imaging.Encoder]::Quality
    $encoderParameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
    $encoderParameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new($qualityEncoder, [long]88)
    try {
      $bitmap.Save($Destination, $jpegCodec, $encoderParameters)
    } finally {
      $encoderParameters.Dispose()
    }
  } finally {
    $bitmap.Dispose()
  }
} finally {
  $sourceImage.Dispose()
}
