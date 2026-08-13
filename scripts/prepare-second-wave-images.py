"""Normalize generated second-wave artwork into the site's hero-image format."""

from pathlib import Path
import sys

from PIL import Image, ImageOps


PROJECT_ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIRECTORY = PROJECT_ROOT / "public" / "images" / "articles" / "unique"


def prepare(source: Path, slug: str) -> Path:
    output = OUTPUT_DIRECTORY / f"{slug}.jpg"
    with Image.open(source) as original:
        normalized = ImageOps.exif_transpose(original).convert("RGB")
        hero = ImageOps.fit(normalized, (1200, 675), method=Image.Resampling.LANCZOS)
        hero.save(output, "JPEG", quality=88, optimize=True, progressive=True)
    return output


def main() -> None:
    if len(sys.argv) < 2:
        raise SystemExit("Pass one or more SOURCE=SLUG assignments.")

    for assignment in sys.argv[1:]:
        source_name, separator, slug = assignment.rpartition("=")
        if not separator or not source_name or not slug:
            raise SystemExit(f"Invalid assignment: {assignment}")
        output = prepare(Path(source_name), slug)
        print(f"{output.name}\t{output.stat().st_size}")


if __name__ == "__main__":
    main()
