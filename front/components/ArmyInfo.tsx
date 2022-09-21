import {Text} from "@nextui-org/react";
import {Team} from "@context/NearContext";

export default function ArmyInfo(props: { army: Team | undefined, name: string}) {
    const deadInfo = () => {
        return <Text h2>{props.name} army si dead :(</Text>;
    }
    const armyInfo = () => {
        return <Text h2>Number of  {props.name} army: {props?.army?.army}</Text>;
    }
    if (props?.army?.dead){
        return deadInfo();
    }
    return armyInfo();
}
