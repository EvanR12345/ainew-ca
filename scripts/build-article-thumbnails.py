"""Build lightweight colour thumbnails from the canonical article artwork."""

from pathlib import Path

from PIL import Image, ImageOps


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIRECTORY = PROJECT_ROOT / "public" / "images" / "articles" / "unique"
OUTPUT_DIRECTORY = PROJECT_ROOT / "public" / "images" / "articles" / "thumbs"
THUMBNAIL_SIZE = (800, 450)


def build_thumbnail(source: Path) -> Path:
    output = OUTPUT_DIRECTORY / f"{source.stem}.webp"
    with Image.open(source) as original:
        normalized = ImageOps.exif_transpose(original).convert("RGB")
        thumbnail = ImageOps.fit(normalized, THUMBNAIL_SIZE, method=Image.Resampling.LANCZOS)
        thumbnail.save(output, "WEBP", quality=76, method=6)
    return output


def main() -> None:
    OUTPUT_DIRECTORY.mkdir(parents=True, exist_ok=True)
    sources = sorted(SOURCE_DIRECTORY.glob("*.jpg"))
    if not sources:
        raise SystemExit(f"No article artwork found in {SOURCE_DIRECTORY}")

    total_bytes = 0
    for source in sources:
        output = OUTPUT_DIRECTORY / f"{source.stem}.webp"
        if not output.exists() or output.stat().st_mtime < source.stat().st_mtime:
            output = build_thumbnail(source)
        total_bytes += output.stat().st_size

    print(f"Built {len(sources)} thumbnails ({total_bytes / 1024 / 1024:.2f} MB)")


if __name__ == "__main__":
    main()
