import { Button, Grid} from "@nextui-org/react";
import Dice from "@components/Dice";
import {useState} from "react";
import {Team} from "@context/NearContext";

export default function DicesGrid(props: {team: string, myTurn: boolean, thrownDices: any, army: Team | any}) {
    const [dices, setDices] = useState(props.army?.dead ? [0,0,0] : [1, 1, 1] );

    const throwDices = () => {
        const thrownDices = [getFirst(), getSecond(), getThird()];
        setDices(thrownDices);
        props.thrownDices(thrownDices);
    }

    const getRandom = () => {
        return Math.floor(Math.random() * (6 - 1 + 1) + 1);
    }

    const getFirst = () => {
        return getRandom();
    }
    const getSecond = () => {
        if (props.team == "blue") {
            switch (props.army.army) {
                case 1:
                    return 0;
                    break;
                case 2:
                    return 0;
                    break
                default:
                    return getRandom();
                    break;
            }
        }
        switch (props.army.army) {
            case 1: return 0;
                break;
            default: return getRandom();
                break;
        }
    }
    const getThird = () => {
        if (props.team == "blue") {
            switch (props.army.army) {
                case 1:
                    return 0;
                    break;
                case 2:
                    return 0;
                    break;
                case 3:
                    return 0;
                    break
                default:
                    return getRandom();
                    break;
            }
        }
        switch (props.army.army) {
            case 1: return 0;
                break;
            case 2: return 0;
                break;
            default: return getRandom();
                break;
        }
    }


    return (
        <Grid.Container gap={2} justify="center">
            <Grid xs>
                <Dice num={dices[0]} team={props.team} />
            </Grid>
            <Grid xs>
                <Dice num={dices[1]} team={props.team} />
            </Grid>
            <Grid xs>
                <Dice num={dices[2]} team={props.team} />
            </Grid>
            <Grid xs justify="center" alignContent="center">
                <Button bordered color={props.team == "blue" ? "primary" : "error"} auto onPress={throwDices} disabled={!props.myTurn}>
                    Throw dices
                </Button>
            </Grid>
        </Grid.Container>
    );
}
