import Layout from "@components/Layout";
import {Container, Card, Button, Grid, Spinner} from "@nextui-org/react";
import type {NextPage} from "next";
import DicesGrid from "@components/DicesGrid";
import {useEffect, useState} from "react";
import useGetInfoQuery from "../queries/useGetInfoQuery";
import ArmyInfo from "@components/ArmyInfo";
import BattleInfo from "@components/BattleInfo";
import useResetMutation from "../queries/useResetMutation";
import useThrowDicesMutation from "../queries/useThrowDicesMutation";

const Home: NextPage = () => {
    let { data: risiko, isLoading: isLoadingRisiko, refetch } = useGetInfoQuery();

    const mutation = useResetMutation();
    const throwDicesMutation = useThrowDicesMutation();
    console.log(!(risiko?.red.dead || risiko?.blue.dead));

    const [blueTurn, setBlueTurn] = useState(true);
    const [redTurn, setRedTurn] = useState(false);

    const [blueDices, setBlueDices] = useState([1,1,1]);
    const [redDices, setRedDices] = useState([1,1,1]);

    const blueThrowDices = (dices: any) => {
        setBlueDices(dices);
        setBlueTurn(false);
        setRedTurn(true);
    }
    const redThrowDices = async (dices: any) => {
        setRedDices(dices);
        await throwDicesMutation.mutateAsync({blue_cubes: blueDices, red_cubes: dices});
        refetch();
        setBlueTurn(false);
        setRedTurn(false);
    }

    const reset = async () => {
        await mutation.mutateAsync();
        refetch();
        setBlueTurn(true);
        setRedTurn(false);
        setBlueDices([1,1,1]);
        setRedDices([1,1,1]);
    }

    useEffect(() => {
        //console.log("useEffect")
        if (!risiko?.blue.dead && !risiko?.red.dead){
            setBlueTurn(true);
        }
    }, [risiko]);

    return (
        <Layout>
            {isLoadingRisiko && <Spinner />}
            <Container>
                <Grid.Container gap={2} justify="center">
                    <Grid xs={3}>
                        <ArmyInfo army={risiko?.blue} name={"blue"}/>
                        <ArmyInfo army={risiko?.red} name={"red"}/>
                    </Grid>
                    <Grid xs={6} justify="center">
                        <BattleInfo message={risiko?.response.message}/>
                    </Grid>
                </Grid.Container>
                <Card>
                    <Card.Body>
                        <DicesGrid team="blue" myTurn={blueTurn} thrownDices={blueThrowDices} army={risiko?.blue}/>
                    </Card.Body>
                </Card>
                <Card css={{mt: 10}}>
                    <Card.Body>
                        <DicesGrid team="red" myTurn={redTurn} thrownDices={redThrowDices} army={risiko?.red}/>
                    </Card.Body>
                </Card>
                <Grid.Container gap={2} justify="center" css={{mt: 10}}>
                    <Button bordered color={"gradient"} auto onClick={reset} size="lg">
                        Reset Game
                    </Button>
                </Grid.Container>
            </Container>
        </Layout>
    );
};

export default Home;
