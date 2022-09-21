import useAuthContext from "@context/AuthContext";
import useNearContext from "@context/NearContext";
import { Button, Col, Loading, Row, Text } from "@nextui-org/react";
import { utils } from "near-api-js";
import Link from "next/link";
import useBalanceQuery from "queries/useBalanceQuery";

export default function Navbar() {
  const { accountId } = useNearContext();
  const { isSignedIn, signOut, signIn } = useAuthContext();
  const { data: balance, isLoading } = useBalanceQuery();

  return (
    <Row
      justify="space-between"
      align="center"
      css={{ "@xsMax": { flexDirection: "column" } }}
    >
      <Col>
        <Row align="baseline">
          <Link href="/">
            <Text
              h2
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
                cursor: "pointer",
                "@xsMax": { fontSize: "$xl4" },
              }}
            >
              Blockchain App
            </Text>
          </Link>
          <Text
            css={{ "@xs": { ml: "$4" }, "@xsMax": { display: "none" } }}
            color="default"
            h5
          >
            on Near
          </Text>
        </Row>
      </Col>
      <Col css={{ display: "flex", justifyContent: "flex-end" }}>
        {isSignedIn() ? (
          <>
            <Button.Group disabled css={{ m: 0, mr: "$5" }}>
              <Button auto>{accountId}</Button>

              <Button auto>
                {isLoading && <Loading />}
                {!isLoading && (
                  <Text>
                    {utils.format.formatNearAmount(
                      balance?.available || "0",
                      2
                    )}{" "}
                    N
                  </Text>
                )}
              </Button>
            </Button.Group>

            <Button color="gradient" onClick={() => signOut()} auto ghost>
              Sign out
            </Button>
          </>
        ) : (
          <Button color="gradient" onClick={() => signIn()} auto>
            Sign in
          </Button>
        )}
      </Col>
    </Row>
  );
}
