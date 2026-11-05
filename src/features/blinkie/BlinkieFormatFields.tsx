import { Card } from "../../components/Card/Card.tsx";
import { FormatList } from "./FormatList/FormatList.tsx";

export function BlinkieFormatFields() {
  return (
    <Card title="Format" bullet="diamond">
      <FormatList />
      <p className="text-tiny text-grape-700">
        Blinkies are 150 by 20. Badges are 88 by 31 with a rounded bevel. Stamps are 32 by 32
        with a rounded bevel.
      </p>
    </Card>
  );
}
