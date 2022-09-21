import { Container, Spacer } from "@nextui-org/react";
import { PropsWithChildren } from "react";
import Navbar from "@components/Navbar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Container>
      <Spacer y={1} />
      <Navbar />
      <Spacer y={2} />
      {children}
    </Container>
  );
}
