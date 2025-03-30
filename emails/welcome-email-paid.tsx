import { siteConfig } from "@/config/site";
import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import Footer from "./components/footer";

const WelcomeEmailPaid = ({ name = "John" }: { name: string }) => (
  <Html>
    <Head>
      <Font
        fontFamily="Inter"
        fallbackFontFamily="sans-serif"
        webFont={{
          url: "https://comma.to/_static/fonts/InterVariable.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>Welcome to Comma Pro</Preview>
    <Body style={{ ...main, fontFamily: "Inter" }}>
      <Container style={container}>
        <Heading className="text-2xl my-12  text-secondary" style={h1}>
        Welcome to Comma Pro
        </Heading>
        <Text>Hi, {name}</Text>
        <Text></Text>
        <Text>
        Thanks for upgrading to Comma Pro! You now have all our features unlocked. <br /><br />
        We built Comma based on what users like you actually want. We'd love to hear what you think! <br /><br />
        Got ideas for new features? Found something not working right? Let us know! <br />
        </Text>
        <Footer />
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmailPaid;

const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const link = {
  color: "#606060",
  fontSize: "14px",
  textDecoration: "underline",
};
