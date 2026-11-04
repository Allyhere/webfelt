import { Card } from "../../components/Card/Card.tsx";
import { EffectList } from "./EffectList/EffectList.tsx";

export function EffectFields() {
  return (
    <Card title="Effects" bullet="note">
      <EffectList />
      <p className="text-tiny text-grape-700">
        Effects stack in the order you pick them. The number on a chip is its place in the stack.
      </p>
    </Card>
  );
}
