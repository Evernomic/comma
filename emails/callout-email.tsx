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

const CalloutEmail = ({
  name = "John",
  email = "john@doe.com",
  calloutTitle = "Untitled",
  profileURL = "sasa",
}: {
  name: string;
  email: string;
  calloutTitle: string;
  profileURL: string;
}) => (
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
    <Preview>New Application for Your Callout</Preview>
    <Body style={{ ...main, fontFamily: "Inter" }}>
      <Container style={container}>
        <Heading className="text-2xl my-12  text-secondary" style={h1}>
          New Application for Your Callout
        </Heading>
        <Text style={{ fontSize: 14 }}>
          {name} ({email}) is interested in your callout titled{" "}
          {calloutTitle}{" "}
        </Text>

        <Text style={{ fontSize: 14 }}>
          If you want to get in touch, just reply to this email.
        </Text>
        <Link href={profileURL} target="_blank" style={link}>
          Click to see the applicant&apos;s Comma page
        </Link>
        <Footer />
      </Container>
    </Body>
  </Html>
);

export default CalloutEmail;

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
