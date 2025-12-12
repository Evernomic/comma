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

const WelcomeEmail = ({ name = "John" }: { name?: string }) => (
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
    <Preview>Welcome to Comma 👋</Preview>
    <Body style={{ ...main, fontFamily: "Inter" }}>
      <Container style={container}>
        <Heading className="text-2xl my-12  text-secondary" style={h1}>
          Welcome to Comma 👋
        </Heading>
        <Text>Hi{name && name?.length > 0 ? ` ${name},` : ","}</Text>
        <Text>
          Welcome to Comma, good to have you here!
          <br />
          <br />
          <b>Here's what you can do:</b>
          <br />
          <br />
          • Create your first article
          <br />
          • Show off a project
          <br />
          • Add a bookmark
          <br />
          • Build a clean page about yourself
          <br />
          • Get found on our Explore page
          <br />
          • Use built-in SEO tools
          <br />
          <br />
          Ready to start? <Link href="https://app.comma.to/">
            Click here
          </Link>{" "}
          and start building.
          <br />
          <br />
          <b>Want more?</b> Upgrade anytime for unlimited content, custom
          themes, and email collection. Questions? Just reply to this email. I
          read every one.
          <br />
          <br />
          Thanks,
          <br />
          Arian
        </Text>
        <Footer />
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

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
