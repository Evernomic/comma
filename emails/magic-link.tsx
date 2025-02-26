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
import { siteConfig } from "@/config/site";

const MagicLinkEmail = ({ url = siteConfig.url }: { url: string }) => (
  <Html>
    <Head>
      <Font
        fontFamily="Ubuntu"
        fallbackFontFamily="sans-serif"
        webFont={{
          url: "https://fonts.gstatic.com/s/ubuntu/v20/4iCs6KVjbNBYlgoKfw72nU6AFw.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>Log in with this magic link</Preview>
    <Body style={{ ...main, fontFamily: "Ubuntu" }}>
      <Container style={container}>
        <Heading className="text-2xl my-12  text-secondary" style={h1}>
          Login
        </Heading>
        <Link href={url} target="_blank" style={link}>
          Click here to log in with this magic link
        </Link>
        <Text style={{ ...text, color: "#606060" }}>
          If you didn&apos;t try to login, you can safely ignore this email.
        </Text>
        <Footer />
      </Container>
    </Body>
  </Html>
);

export default MagicLinkEmail;

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

const text = {
  color: "#333",
  fontSize: "14px",
  margin: "24px 0",
};
