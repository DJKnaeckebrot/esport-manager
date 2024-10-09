import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface VercelInviteUserEmailProps {
  username?: string;
  userImage?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  teamName?: string;
  teamImage?: string;
  inviteLink?: string;
  inviteFromIp?: string;
  inviteFromLocation?: string;
}

interface InviteEmailTemplateProps {
  senderName: string;
  emailAddress: string;
  teamName: string;
  role: string;
  id: any;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const InviteEmailTemplate = ({
  senderName,
  emailAddress,
  teamName,
  role,
  id,
}: InviteEmailTemplateProps) => {
  const previewText = `${senderName} hat dich zum E-Sports Manager eingeladen!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://i.ibb.co/2KvWhsf/logo-black.png`}
                width="40"
                height="37"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Tritt dem <strong>{teamName}</strong> Team im E-Sports Manager
              bei!
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">Hi!</Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{senderName}</strong> hat dich zu seinem Team {teamName}{" "}
              bei dem E-Sports Manager als {role} eingeladen!
            </Text>
            {/* <Section>
              <Row>
                <Column align="right">
                  <Img
                    className="rounded-full"
                    src={userImage}
                    width="64"
                    height="64"
                  />
                </Column>
                <Column align="center">
                  <Img
                    src={`${baseUrl}/static/vercel-arrow.png`}
                    width="12"
                    height="9"
                    alt="invited you to"
                  />
                </Column>
                <Column align="left">
                  <Img
                    className="rounded-full"
                    src={teamImage}
                    width="64"
                    height="64"
                  />
                </Column>
              </Row>
            </Section> */}
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={`https://esports.djkb.app/sign-up?inviteId=` + id}
              >
                Beitreten
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              oder copy und paste diese URL in deinen browser:{" "}
              <Link
                href={`https://esports.djkb.app/sign-up?inviteId=` + id}
                className="text-blue-600 no-underline"
              >
                https://esports.djkb.app/sign-up?inviteId={id}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Diese Einladung ist für{" "}
              <span className="text-black">{emailAddress}</span>. Falls Sie
              diese Einladung nicht erwartet haben, können Sie diese E-Mail
              ignorieren. Sollten Sie sich Sorgen um die Sicherheit Ihres Kontos
              machen, antworten Sie bitte auf diese E-Mail, um mit uns in
              Kontakt zu treten.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
