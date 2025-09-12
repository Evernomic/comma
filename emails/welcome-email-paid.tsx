import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import Footer from "./components/footer";

const WelcomeEmailPaid = ({ name = "John" }: { name?: string }) => (
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
    <Preview>Welcome to Comma Pro 🎉</Preview>
    <Body style={{ ...main, fontFamily: "Inter" }}>
      <Container style={container}>
        <Heading className="text-2xl my-12  text-secondary" style={h1}>
          Welcome to Comma Pro 🎉
        </Heading>
        <Text>Hi{(name && name?.length > 0) ? ` ${name},` : ","}</Text>
        <Text>
          <b>Here's what you get:</b><br /><br />

          • <b>Unlimited content</b> — Articles, projects, bookmarks, and pages<br />
          • <b>Custom themes</b> — Make your site look unique<br />
          • <b>Email collection</b> — Build your email list<br />
          • <b>Custom domain</b> — Use your own domain<br />
          • <b>Open calls</b> — Post opportunities to our community<br />
          • <b>Advanced analytics</b> — See detailed visitor stats<br />
          • <b>No watermark</b> — Clean, professional look<br />
          • <b>Priority support</b> — Get help faster<br /><br />

          <b>Quick tip:</b> Start by adding your custom domain in settings and picking a custom theme you like.<br /><br />

          I built Comma based on what users want. Got ideas for new features? Found a bug? Just reply to this email.<br /><br />

          Thanks for supporting Comma,<br />
          Arian

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
