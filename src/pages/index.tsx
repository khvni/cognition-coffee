import React from "react"
import { Link, type HeadFC } from "gatsby"
import { BIO } from "@/data/experience"
import { APPS } from "@/lib/apps"
import { AppIcon } from "@/components/AppIcon"
import { SEO } from "@/components/SEO"
import { Container, Card, Text } from "@/components/ui"

const launchers = APPS.filter((a) => a.id !== "home" && a.nav !== false)

const IndexPage: React.FC = () => (
  <Container as="section" className="py-8">
    <Text as="p" preset="eyebrow">The Cognition Coffee Company</Text>
    <h1 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">{BIO.hook}</h1>
    <Text as="p" preset="subtitle" className="mt-4">{BIO.oneLiner}</Text>

    <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {launchers.map((a) => (
        <li key={a.id}>
          <Card as={Link} to={a.path} hover className="flex items-start gap-3 p-4">
            <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-canvas text-ink">
              <AppIcon id={a.icon} size={18} />
            </span>
            <span>
              <Text as="span" preset="body" className="block font-medium">{a.title}</Text>
              <Text as="span" preset="small" className="block">{a.blurb}</Text>
            </span>
          </Card>
        </li>
      ))}
    </ul>
  </Container>
)

export default IndexPage

export const Head: HeadFC = () => <SEO />
