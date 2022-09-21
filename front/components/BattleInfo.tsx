import {Text} from "@nextui-org/react";

export default function BattleInfo(props: { message: string | undefined}) {
    return (
        <>
            <Text h2>{props.message}</Text>
        </>
    );
}
