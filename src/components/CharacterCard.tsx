import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";

export default function CharacterCard({character}:{character:string}) {
  if (character ==="") return null;

  const unicode = character.codePointAt(0)?.toString(16);

  return (
    <Card className="max-w-[180px]">
      <CardHeader>
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={`https://glyphwiki.org/glyph/u${unicode}.svg`}
          width={180}
        />
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="flex">
          <span className="text-5xl">{character}</span>
          <div className="flex flex-col p-1">
            <span>U+{unicode?.toUpperCase()}</span>
            <span>CJK</span>
          </div>
        </p>
        <p>総画数：X</p>
        <p>関連漢字：X</p>
      </CardBody>
      {/* <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter> */}
    </Card>
  );
}
