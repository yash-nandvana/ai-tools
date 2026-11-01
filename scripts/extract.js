const fs = require('fs');
const path = require('path');

// Raw text supplied by user
const rawQAData = `
1. AI-powered QA and autonomous testing platforms
Testsigma|https://testsigma.com
Katalon|https://katalon.com
Katalon TrueTest|https://qa.katalon.com/truetest
KaneAI by TestMu AI|https://www.testmuai.com
mabl|https://www.mabl.com
testRigor|https://testrigor.com
ACCELQ|https://www.accelq.com
Functionize|https://www.functionize.com
Virtuoso QA|https://www.virtuosoqa.com
Autify|https://autify.com
Momentic|https://momentic.ai
TestSprite|https://www.testsprite.com
QA.tech|https://qa.tech
QA Wolf|https://www.qawolf.com
Reflect|https://reflect.run
test.ai|https://test.ai
Tricentis|https://www.tricentis.com
Tricentis Tosca|https://www.tricentis.com/products/automate-testing-tosca
Leapwork|https://www.leapwork.com
Eggplant|https://www.keysight.com/us/en/products/software/eggplant.html
ACCELQ Autopilot|https://www.accelq.com/platform/autopilot
BrowserStack AI Agents|https://www.browserstack.com/automate/ai-agents
Applitools|https://applitools.com
Keploy|https://keploy.io
Meticulous|https://www.meticulous.ai
Pythagora|https://pythagora.ai
Diffblue|https://www.diffblue.com
Qodo|https://www.qodo.ai
QA Pilot|https://qapilot.com
testRex|https://testrex.com
Tester Army|https://tester.army
Browser Use|https://browser-use.com
OpenHands|https://openhands.dev
SWE-agent|https://github.com/SWE-agent/SWE-agent
OmniParser|https://github.com/microsoft/OmniParser
Stagehand|https://www.stagehand.dev
Skyvern|https://www.skyvern.com
Browserbase|https://www.browserbase.com
Cognition Devin|https://devin.ai

2. Visual regression testing and screenshot comparison
Applitools Eyes|https://applitools.com
Percy by BrowserStack|https://percy.io
Chromatic|https://www.chromatic.com
Argos CI|https://argos-ci.com
Lost Pixel|https://lost-pixel.com
Happo|https://happo.io
BackstopJS|https://github.com/garris/BackstopJS
Playwright|https://playwright.dev
Cypress|https://www.cypress.io
Vitest Visual Regression|https://vitest.dev/guide/browser/visual-regression-testing
Loki|https://github.com/oblador/loki
reg-suit|https://github.com/reg-viz/reg-suit
jest-image-snapshot|https://github.com/americanexpress/jest-image-snapshot
Pixeleye|https://pixeleye.io
Screener|https://screener.io
Crosscheck|https://crosscheck.cloud
Needle|https://needle.tools
VisualReview|https://github.com/VisualReview/VisualReview
Wraith|https://github.com/BBC-News/wraith
PhantomCSS|https://github.com/Huddle/PhantomCSS
Gemini Visual Testing|https://github.com/gemini-testing/gemini
WebdriverIO Visual Service|https://webdriver.io/docs/visual-testing/
Storycap|https://github.com/reg-viz/storycap
Storybook|https://storybook.js.org
ScreenshotOne|https://screenshotone.com
Urlbox|https://urlbox.com
Browserless|https://www.browserless.io
CaptureKit|https://www.capturekit.dev
ScreenshotAPI|https://screenshotapi.net
HTMLCSStoImage|https://htmlcsstoimage.com

3. Browser automation and end-to-end testing
Selenium|https://www.selenium.dev
Puppeteer|https://pptr.dev
WebdriverIO|https://webdriver.io
Nightwatch.js|https://nightwatchjs.org
TestCafe|https://testcafe.io
CodeceptJS|https://codecept.io
Robot Framework|https://robotframework.org
Taiko|https://taiko.dev
Cucumber|https://cucumber.io
Gauge|https://gauge.org
Capybara|https://github.com/teamcapybara/capybara
Watir|https://watir.com
Testim|https://www.testim.io
Endtest|https://endtest.io
Rainforest QA|https://www.rainforestqa.com
BugBug|https://bugbug.io
TestProject|https://testproject.io
Sahi Pro|https://www.sahipro.com
Ranorex|https://www.ranorex.com
SmartBear TestComplete|https://smartbear.com/product/testcomplete/
OpenText UFT One|https://www.opentext.com/products/uft-one
Selenoid|https://aerokube.com/selenoid/latest/
Moon|https://aerokube.com/moon/latest/
Zalenium|https://github.com/zalando/zalenium
Testcontainers|https://testcontainers.com
WireMock|https://wiremock.org
Mock Service Worker|https://mswjs.io
Mockoon|https://mockoon.com
Hoverfly|https://hoverfly.io
Mountebank|https://www.mbtest.org

4. Cross-browser and real-device testing platforms
BrowserStack|https://www.browserstack.com
LambdaTest|https://www.testmuai.com
Sauce Labs|https://saucelabs.com
TestingBot|https://testingbot.com
Kobiton|https://kobiton.com
Perfecto|https://www.perfecto.io
HeadSpin|https://www.headspin.io
pCloudy|https://www.pcloudy.com
BitBar|https://smartbear.com/product/bitbar/
AWS Device Farm|https://aws.amazon.com/device-farm/
Firebase Test Lab|https://firebase.google.com/docs/test-lab
App Center Test|https://learn.microsoft.com/en-us/appcenter/test-cloud/
Appetize|https://appetize.io
Genymotion|https://www.genymotion.com
Browserling|https://www.browserling.com
CrossBrowserTesting|https://smartbear.com/product/crossbrowsertesting/
Comparium|https://comparium.app
MultiBrowser|https://www.multibrowser.com
Browsera|https://browsera.com
Appium|https://appium.io
Maestro|https://maestro.mobile.dev
Detox|https://wix.github.io/Detox/
Espresso|https://developer.android.com/training/testing/espresso
XCUITest|https://developer.apple.com/documentation/xctest
UIAutomator|https://developer.android.com/training/testing/other-components/ui-automator
Patrol|https://patrol.leancode.co

5. API testing and service testing
Postman|https://www.postman.com
Bruno|https://www.usebruno.com
Insomnia|https://insomnia.rest
Hoppscotch|https://hoppscotch.io
SoapUI|https://www.soapui.org
ReadyAPI|https://smartbear.com/product/ready-api/
Karate|https://karatelabs.io
Rest Assured|https://rest-assured.io
Pact|https://pact.io
PactFlow|https://pactflow.io
Schemathesis|https://schemathesis.readthedocs.io
Dredd|https://dredd.org
Hurl|https://hurl.dev
HTTPie|https://httpie.io
Kreya|https://kreya.app
Yaak|https://yaak.app
Step CI|https://stepci.com
Speedscale|https://speedscale.com
Parasoft SOAtest|https://www.parasoft.com/products/parasoft-soatest/
Assertible|https://assertible.com
Checkly|https://www.checklyhq.com
Runscope|https://www.runscope.com
API Fortress|https://apifortress.com
APIsec|https://apisec.ai
42Crunch|https://42crunch.com
Wallarm|https://wallarm.com
StepZen|https://stepzen.com
GraphQL Inspector|https://graphql-inspector.com
Apollo GraphOS|https://www.apollographql.com
GraphQL Hive|https://the-guild.dev/graphql/hive
Prism Mock Server|https://stoplight.io/open-source/prism
OpenAPI Generator|https://openapi-generator.tech
Tavern|https://tavern.readthedocs.io
Newman|https://github.com/postmanlabs/newman
Supertest|https://github.com/ladjs/supertest
PactumJS|https://pactumjs.github.io

6. Performance, load and stress testing
k6|https://grafana.com/oss/k6/
Apache JMeter|https://jmeter.apache.org
Gatling|https://gatling.io
Locust|https://locust.io
Artillery|https://www.artillery.io
Vegeta|https://github.com/tsenart/vegeta
wrk|https://github.com/wg/wrk
wrk2|https://github.com/giltene/wrk2
oha|https://github.com/hatoo/oha
hey|https://github.com/rakyll/hey
Siege|https://github.com/JoeDog/siege
Tsung|https://tsung.erlang-projects.org
OpenSTA|https://opensta.org
LoadRunner|https://www.opentext.com/products/loadrunner-professional
NeoLoad|https://www.tricentis.com/products/performance-testing-neoload
BlazeMeter|https://www.blazemeter.com
Flood|https://www.flood.io
OctoPerf|https://octoperf.com
LoadView|https://www.loadview-testing.com
Loader.io|https://loader.io
Loadster|https://loadster.app
Hyperfoil|https://hyperfoil.io
Fortio|https://fortio.org
Bombardier|https://github.com/codesenberg/bombardier
Taurus|https://gettaurus.org
Autocannon|https://github.com/mcollina/autocannon
Faker|https://fakerjs.dev
Toxiproxy|https://github.com/Shopify/toxiproxy
Chaos Mesh|https://chaos-mesh.org
LitmusChaos|https://litmuschaos.io

7. Accessibility testing and WCAG compliance
axe DevTools|https://www.deque.com/axe/devtools/
axe-core|https://github.com/dequelabs/axe-core
WAVE|https://wave.webaim.org
Lighthouse|https://developer.chrome.com/docs/lighthouse/
Pa11y|https://pa11y.org
Accessibility Insights|https://accessibilityinsights.io
IBM Equal Access|https://www.ibm.com/able/toolkit/tools
ARC Toolkit|https://www.tpgi.com/arc-platform/arc-toolkit/
Siteimprove Accessibility|https://www.siteimprove.com
Silktide|https://silktide.com
EqualWeb|https://www.equalweb.com
UserWay|https://userway.org
Level Access|https://www.levelaccess.com
Evinced|https://www.evinced.com
Tenon|https://tenon.io
HTML_CodeSniffer|https://squizlabs.github.io/HTML_CodeSniffer/
ORCA|https://orca-software.com
ANDI|https://www.ssa.gov/accessibility/andi/help/install.html

8. Unit testing, integration testing and component testing
Vitest|https://vitest.dev
Jest|https://jestjs.io
Mocha|https://mochajs.org
Chai|https://www.chaijs.com
Sinon.js|https://sinonjs.org
Testing Library|https://testing-library.com
React Testing Library|https://testing-library.com/docs/react-testing-library/intro/
Vue Test Utils|https://test-utils.vuejs.org
AVA|https://github.com/avajs/ava
Tap|https://node-tap.org
uvu|https://github.com/lukeed/uvu
QUnit|https://qunitjs.com
Jasmine|https://jasmine.github.io
Nock|https://github.com/nock/nock
PGlite|https://pglite.dev
pgTAP|https://pgtap.org
PHPUnit|https://phpunit.de
Pest|https://pestphp.com
Pytest|https://pytest.org
RSpec|https://rspec.info
JUnit|https://junit.org
TestNG|https://testng.org
NUnit|https://nunit.org

9. Test management, test cases and QA planning
TestRail|https://www.testrail.com
Qase|https://qase.io
Xray|https://www.getxray.app
Zephyr|https://smartbear.com/test-management/zephyr/
Testmo|https://www.testmo.com
Kiwi TCMS|https://kiwitcms.org
PractiTest|https://www.practitest.com
Testiny|https://www.testiny.io
TestLink|https://testlink.org
TestCollab|https://testcollab.com
Tuskr|https://tuskr.app
TestCaseLab|https://testcaselab.com
TestMonitor|https://www.testmonitor.com
SpiraTest|https://www.inflectra.com/SpiraTest/
Aqua|https://www.aqua-cloud.io
QA Touch|https://www.qatouch.com
TestGear|https://testgear.io
Testpad|https://testpad.com
Testomat.io|https://testomat.io
Allure TestOps|https://qameta.io
ReportPortal|https://reportportal.io
Squash TM|https://www.squashtest.com
QMetry|https://www.qmetry.com
Testuff|https://www.testuff.com
TestLodge|https://www.testlodge.com
TestCase Studio|https://selectorshub.com/testcase-studio/

10. Bug reporting, issue tracking and session replay
Sentry|https://sentry.io
Bugsnag|https://www.bugsnag.com
Rollbar|https://rollbar.com
Airbrake|https://airbrake.io
Raygun|https://raygun.com
LogRocket|https://logrocket.com
FullStory|https://www.fullstory.com
PostHog|https://posthog.com
Highlight.io|https://www.highlight.io
OpenReplay|https://openreplay.com
GlitchTip|https://glitchtip.com
Errbit|https://github.com/errbit/errbit
TrackJS|https://trackjs.com
Jam|https://jam.dev
Marker.io|https://marker.io
Usersnap|https://usersnap.com
Bird Eats Bug|https://birdeatsbug.com
BugHerd|https://bugherd.com
Pastel|https://usepastel.com
zipBoard|https://zipboard.co
Shake|https://www.shakebugs.com
Instabug|https://www.instabug.com
Embrace|https://embrace.io
Firebase Crashlytics|https://firebase.google.com/products/crashlytics
Honeybadger|https://www.honeybadger.io
Bugzilla|https://www.bugzilla.org
MantisBT|https://www.mantisbt.org
Focalboard|https://www.focalboard.com
Plane|https://plane.so
OpenProject|https://www.openproject.org

11. Security, penetration testing and vulnerability testing
OWASP ZAP|https://www.zaproxy.org
Burp Suite|https://portswigger.net/burp
Nuclei|https://github.com/projectdiscovery/nuclei
StackHawk|https://www.stackhawk.com
Probely|https://probely.com
Invicti|https://www.invicti.com
Acunetix|https://www.acunetix.com
Detectify|https://detectify.com
Bright Security|https://brightsec.com
Escape|https://escape.tech
Astra Security|https://www.getastra.com
Intruder|https://www.intruder.io
Snyk|https://snyk.io
Semgrep|https://semgrep.dev
SonarQube|https://www.sonarsource.com/products/sonarqube/
Checkmarx|https://checkmarx.com
Veracode|https://www.veracode.com
CodeQL|https://codeql.github.com
Trivy|https://trivy.dev
Grype|https://github.com/anchore/grype
Syft|https://github.com/anchore/syft
OWASP Dependency-Check|https://owasp.org/www-project-dependency-check/
OSV-Scanner|https://google.github.io/osv-scanner/
TruffleHog|https://github.com/trufflesecurity/trufflehog
Gitleaks|https://github.com/gitleaks/gitleaks
Checkov|https://www.checkov.io
Terrascan|https://github.com/tenable/terrascan
Prowler|https://prowler.com
ScoutSuite|https://github.com/nccgroup/ScoutSuite
Dependency-Track|https://dependencytrack.org

12. Data validation, database testing and reliability
Great Expectations|https://greatexpectations.io
Soda|https://www.soda.io
dbt Tests|https://docs.getdbt.com/docs/build/data-tests
Elementary|https://www.elementary-data.com
Datafold|https://www.datafold.com
Monte Carlo|https://www.montecarlodata.com
Bigeye|https://www.bigeye.com
Anomalo|https://www.anomalo.com
Metaplane|https://www.metaplane.dev
Validio|https://validio.io
Deequ|https://github.com/awslabs/deequ
Pandera|https://pandera.readthedocs.io
Frictionless|https://framework.frictionlessdata.io
Pydantic|https://docs.pydantic.dev
Cerberus|https://docs.python-cerberus.org
JSON Schema|https://json-schema.org
Ajv|https://ajv.js.org
Zod|https://zod.dev
Valibot|https://valibot.dev
Joi|https://joi.dev
Yup|https://github.com/jquense/yup
tSQLt|https://tsqlt.org
SQLFluff|https://www.sqlfluff.com
SQLMesh|https://sqlmesh.com
DuckDB|https://duckdb.org

13. Email, notifications, payment and third-party integration testing
Mailosaur|https://mailosaur.com
Mailtrap|https://mailtrap.io
MailHog|https://github.com/mailhog/MailHog
Mailpit|https://mailpit.axllent.org
Ethereal Email|https://ethereal.email
Inbucket|https://inbucket.org
Webhook.site|https://webhook.site
Hookdeck|https://hookdeck.com
Svix|https://www.svix.com
ngrok|https://ngrok.com
RequestBin|https://requestbin.com
Beeceptor|https://beeceptor.com
MockServer|https://www.mock-server.com
LocalStack|https://www.localstack.cloud
Stripe CLI|https://docs.stripe.com/stripe-cli
Resend|https://resend.com
Postmark|https://postmarkapp.com
Mailgun|https://www.mailgun.com
SendGrid|https://sendgrid.com
Novu|https://novu.co
Courier|https://www.courier.com
Knock|https://knock.app

14. Visual inspection, design QA and UI review
Polypane|https://polypane.app
Responsively App|https://responsively.app
Sizzy|https://sizzy.co
VisBug|https://github.com/GoogleChromeLabs/ProjectVisBug
CSS Peeper|https://csspeeper.com
PerfectPixel|https://www.welldonecode.com/perfectpixel/
WhatFont|https://www.chengyinliu.com/whatfont.html
PageSpeed Insights|https://pagespeed.web.dev
WebPageTest|https://www.webpagetest.org
DebugBear|https://www.debugbear.com
Calibre|https://calibreapp.com
SpeedCurve|https://www.speedcurve.com
Sitespeed.io|https://www.sitespeed.io
Requestly|https://requestly.com
Unlighthouse|https://unlighthouse.dev

15. CI/CD, test reporting and test infrastructure
GitHub Actions|https://github.com/features/actions
GitLab CI/CD|https://docs.gitlab.com/ee/ci/
Jenkins|https://www.jenkins.io
Buildkite|https://buildkite.com
CircleCI|https://circleci.com
Azure DevOps|https://azure.microsoft.com/products/devops
Bitbucket Pipelines|https://bitbucket.org/product/features/pipelines
TeamCity|https://www.jetbrains.com/teamcity/
Bamboo|https://www.atlassian.com/software/bamboo
Argo CD|https://argo-cd.readthedocs.io
Allure Report|https://allurereport.org
Monocart Reporter|https://github.com/cenfun/monocart-reporter
Mochawesome|https://github.com/adamgruber/mochawesome
Currents|https://currents.dev
Knapsack Pro|https://knapsackpro.com
BuildPulse|https://buildpulse.io
Launchable|https://www.launchableinc.com
Trunk|https://trunk.io
`;

// AI Tools Directory list
const rawAIData = `
1. AI coding assistants and agents
ChatGPT
Claude
Claude Code
OpenAI Codex
GitHub Copilot
Cursor
Windsurf
Google Antigravity
Gemini Code Assist
Amazon Q Developer
Augment Code
Devin
Replit Agent
Aider
Cline
Roo Code
Continue
OpenCode
OpenHands
Tabnine
Sourcegraph Amp
Zed
JetBrains Junie
Kiro
Gemini CLI
Qwen Code
Goose
Plandex
Mentat
GPT Pilot
SWE-agent
Smol Developer
Factory
Pythagora
Warp

2. AI app and website builders
Lovable
Bolt.new
v0
Replit
Firebase Studio
Google AI Studio
Base44
Create
Databutton
Softgen
Lazy AI
Dyad
Tempo Labs
Same
Marblism
Anything
Builder.io
Onlook
Webflow AI
Framer AI
WordPress AI
Hostinger AI Website Builder
Wix AI
Durable
10Web

3. AI UI, UX and frontend design
Figma AI
Figma Make
Uizard
Galileo AI
Magic Patterns
v0
Stitch by Google
Visily
Relume
Motiff
Banani
UX Pilot
Diagram
Anima
Locofy
Builder.io Visual Copilot
Quest AI
TeleportHQ
Penpot
Spline AI

4. AI code review, debugging and code quality
CodeRabbit
Qodo
Greptile
CodeClimate
DeepSource
Sourcery
CodeAnt AI
Snyk
SonarQube
Semgrep
Codacy
Graphite
Ellipsis
Bito
Mutable AI
Amazon CodeGuru
Sentry
Jam
LogRocket
BugSnag
Highlight.io
Bugsink
Rollbar
Datadog
Dynatrace

5. AI testing and QA automation
TestSprite
Momentic
QA.tech
Testsigma
testRigor
Mabl
Katalon
Autify
Functionize
Virtuoso QA
Meticulous
Diffblue
Keploy
Qodo
Applitools
BrowserStack
LambdaTest
Playwright
Cypress
Checkly
Chromatic
Percy
BugBug
Reflect
Ponicode

6. AI APIs, backend and database development
Postman
Apidog
Hoppscotch
Insomnia
Swagger
Speakeasy
Stainless
Fern
Mintlify
Scalar
Supabase
Neon
PlanetScale
Turso
Xata
Prisma
Drizzle ORM
Convex
Hasura
Appwrite
Firebase
PocketBase
Upstash
Redis
MongoDB
DataGrip
DBeaver
SQLAI
AI2sql
Text2SQL

7. AI agent frameworks and orchestration
LangChain
LangGraph
LlamaIndex
CrewAI
AutoGen
Microsoft Agent Framework
OpenAI Agents SDK
Google ADK
Pydantic AI
Mastra
Vercel AI SDK
Agno
Haystack
Semantic Kernel
DSPy
Smolagents
OpenAI Swarm
Flowise
Dify
Langflow
n8n
Activepieces
Pipedream
Windmill
Temporal
Inngest
Trigger.dev
Prefect
Dagster
Kestra

8. MCP servers, integrations and agent tools
Model Context Protocol
MCP Registry
Smithery
Glama MCP Directory
MCP.so
PulseMCP
Composio
Pipedream Connect
Zapier AI
Make
Gumloop
Browserbase
Browser Use
Stagehand
Skyvern
Playwright MCP
Firecrawl
Crawl4AI
Apify
Bright Data
ScrapeGraphAI
ScrapingBee
Jina AI Reader
Firecrawl MCP
Exa MCP

9. AI search, web research and data extraction
Parallel
Exa
Tavily
Perplexity
You.com
Brave Search API
Firecrawl
Jina AI
SerpApi
Serper
DataForSEO
Apify
Diffbot
Oxylabs
Zyte
Browserless
Crawl4AI
Browse AI
Octoparse
ParseHub
ScrapingAnt
Consensus
Elicit
ResearchRabbit
Semantic Scholar
OpenAlex
arXiv
Connected Papers
SciSpace
NotebookLM

10. LLM providers and model APIs
OpenAI API
Anthropic API
Google Gemini API
Google Vertex AI
xAI API
Mistral AI
Cohere
DeepSeek
Qwen
Groq
Together AI
Fireworks AI
OpenRouter
Hugging Face
Replicate
fal.ai
Cerebras
SambaNova
Novita AI
SiliconFlow
Cloudflare Workers AI
AWS Bedrock
Azure AI Foundry
NVIDIA NIM
Lepton AI
Modal
Baseten
RunPod
DeepInfra

11. Local AI, open-source models and inference
Ollama
LM Studio
Jan
GPT4All
llama.cpp
vLLM
SGLang
LocalAI
KoboldCpp
Open WebUI
AnythingLLM
text-generation-webui
llamafile
Hugging Face Transformers
Axolotl
Unsloth
MLX
MLC LLM
TensorRT-LLM
LiteLLM

12. Vector databases, RAG and AI memory
Pinecone
Weaviate
Qdrant
Chroma
Milvus
Zilliz
LanceDB
Vespa
Redis Vector Search
pgvector
Supabase Vector
MongoDB Vector Search
Elastic AI Search
OpenSearch
Marqo
txtai
Mem0
Zep
Letta
Cognee
Graphiti
RAGFlow

13. AI documentation, knowledge bases and writing
GitBook
Mintlify
ReadMe
Fern
Swimm
Document360
Docusaurus
Starlight
Archbee
Notion AI
Slite
Guru
Outline
Confluence AI
Obsidian
Logseq
NotebookLM
Grammarly
DeepL Write
QuillBot
Jasper
Copy.ai

14. AI image generation and editing
ChatGPT Images
Midjourney
Adobe Firefly
Ideogram
Leonardo AI
Recraft
FLUX
Stable Diffusion
ComfyUI
AUTOMATIC1111
InvokeAI
Fooocus
Playground AI
Krea AI
Freepik AI
Photoroom
Clipdrop
Remove.bg
Upscayl
Magnific AI
Picsart AI
Canva AI
getimg.ai
NightCafe

15. AI video generation and editing
Runway
Google Flow
Veo
Sora
Kling AI
Pika
Luma Dream Machine
Hailuo AI
PixVerse
Vidu
Wan
LTX Studio
HunyuanVideo
HeyGen
Synthesia
D-ID
Captions
Descript
VEED
InVideo AI
OpusClip
Wisecut
Vizard
Kapwing
Fliki
Topaz Video AI

16. AI audio, speech and voice
ElevenLabs
PlayHT
Cartesia
Deepgram
AssemblyAI
Speechmatics
Gladia
Whisper
Faster Whisper
Whisper.cpp
Resemble AI
Murf AI
WellSaid Labs
Fish Audio
Vapi
Retell AI
LiveKit
Pipecat
Hume AI
Suno
Udio
AIVA
Stable Audio
MusicGen
Bark
Kokoro
Piper
Coqui TTS

17. AI automation, workflows and business processes
n8n
Zapier
Make
Activepieces
Pipedream
Gumloop
Lindy
Relay.app
Bardeen
Relevance AI
Dify
Flowise
Langflow
Stack AI
Vellum
Dust
Retool AI
Workato
UiPath
Automation Anywhere
Microsoft Power Automate
Robocorp
Open Interpreter
Computer Use by Anthropic
Browser Use
Skyvern

18. AI DevOps, cloud and infrastructure
Vercel
Netlify
Railway
Render
Fly.io
Cloudflare
DigitalOcean
AWS
Google Cloud
Microsoft Azure
Pulumi
Terraform
Spacelift
env0
Harness
Humanitec
Port
Cortex
Qovery
Kubernetes
Docker
Dagger
Earthly
Sentry
New Relic
Grafana
Honeycomb

19. AI security and privacy tools
Snyk
Semgrep
Socket
GitGuardian
Aikido Security
Endor Labs
Checkmarx
Veracode
Contrast Security
Ox Security
Wiz
Orca Security
Lacework
Palo Alto Prisma Cloud
Trivy
Checkov
Gitleaks
TruffleHog
Dependabot
Renovate
OWASP ZAP
Burp Suite
Promptfoo
Garak
Protect AI
Lakera
HiddenLayer
Robust Intelligence
Fiddler AI
WhyLabs

20. AI evaluation, monitoring and observability
LangSmith
Langfuse
Braintrust
Arize AI
Phoenix
Helicone
Weights & Biases
MLflow
Confident AI
DeepEval
Ragas
Evidently AI
Giskard
TruLens
OpenTelemetry
Opik
Patronus AI
Galileo
Parea AI
Portkey
LiteLLM
Keywords AI

21. AI data analysis and business intelligence
Julius AI
Microsoft Power BI
Tableau
ThoughtSpot
Hex
Evidence
Omni
Metabase
Apache Superset
Lightdash
Preset
Seek AI
Defog
Numbers Station
TextQL
Snowflake Cortex
Databricks AI
MotherDuck
DuckDB
PandasAI
Dataherald
Vanna AI

22. AI meetings, communication and team productivity
Granola
Fireflies.ai
Fathom
Otter.ai
tl;dv
Avoma
Read AI
Krisp
Sembly AI
Supernormal
Jamie
MeetGeek
Zoom AI Companion
Microsoft Teams Copilot
Slack AI
Notion AI
ClickUp AI
Linear
Asana AI
Atlassian Rovo
Taskade
Reclaim AI
Motion
Sunsama
Akiflow

23. AI tools for Shopify, e-commerce and SaaS developers
Shopify
Shopify Dev
Shopify Sidekick
Shopify Magic
Shopify MCP
Tidio
Gorgias
Klaviyo AI
Yotpo
Nosto
Rebuy
Octane AI
Constructor
Algolia
Searchspring
Bloomreach
LimeSpot
Growave
Judge.me
Triple Whale
Polar Analytics
Lifetimely
ShopifyQL
Shopify CLI
Shopify Polaris

24. AI SEO, marketing and content optimization
Surfer SEO
Semrush
Ahrefs
Clearscope
MarketMuse
Frase
NeuronWriter
Scalenut
Writesonic
Anyword
Outranking
SE Ranking
Keyword Insights
LowFruits
AlsoAsked
AnswerThePublic
Screaming Frog
Botify
Conductor
Predis.ai
Buffer
Hootsuite
SocialBee
Taplio
AuthoredUp
Shield Analytics
Brand24
Mention

25. AI email, CRM, sales and customer support
HubSpot AI
Salesforce Einstein
Attio
Twenty CRM
Close
Apollo
Clay
Instantly
Smartlead
Lemlist
Reply.io
Regie.ai
Lavender
Intercom Fin
Zendesk AI
Ada
Forethought
Freshdesk
Crisp
Chatbase
Botpress
Voiceflow
Typebot
Chatwoot
Papercups
Resend
Postmark
Brevo
Customer.io

26. AI mobile app development and cross-platform tools
FlutterFlow
Draftbit
Expo
Flutter
Ionic
Capacitor
NativeScript
AppGyver
Thunkable
Glide
Adalo
Bravo Studio
AppSheet
Builder.ai
Appcircle
Expo EAS
Maestro
Detox
Appium

27. AI machine learning, model training and datasets
Hugging Face
Kaggle
Google Colab
Weights & Biases
Comet ML
ClearML
DVC
Kubeflow
Metaflow
BentoML
KServe
Ray
Anyscale
PyTorch
TensorFlow
JAX
scikit-learn
XGBoost
LightGBM
CatBoost
Label Studio
Argilla
Roboflow
FiftyOne
SuperAnnotate
Scale AI
Snorkel AI
Dataiku
H2O.ai
AutoGluon

28. AI utilities and miscellaneous developer tools
Raycast
Pieces for Developers
Codeium
Phind
Blackbox AI
You.com Code Search
Sourcegraph
Grep.app
PublicWWW
Devv
Kagi
Exa Code Search
Warp
Fig
Atuin
ShellGPT
aichat
LLM CLI
Fabric
DevToys
JSON Crack
Carbon
Ray.so
tldraw
Excalidraw
Mermaid
Eraser
CodePen
StackBlitz
CodeSandbox
`;

console.log("Processing and extracting tools...");
const toolsMap = new Map();

function cleanName(n) {
  return n.trim().replace(/^-\s*/, '').replace(/\s*\(.*\)$/, '').trim();
}

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Parse QA data
const qaLines = rawQAData.split('\n');
let currentQACat = 'AI Testing & QA Automation';
for (let line of qaLines) {
  line = line.trim();
  if (!line) continue;
  if (/^\d+\./.test(line)) {
    currentQACat = line.replace(/^\d+\.\s*/, '').trim();
    continue;
  }
  const parts = line.split('|');
  const name = cleanName(parts[0]);
  const url = parts[1] || `https://${toSlug(name)}.com`;
  if (!name) continue;
  
  const key = name.toLowerCase();
  if (!toolsMap.has(key)) {
    toolsMap.set(key, {
      name,
      category: currentQACat,
      website: url,
      source: 'qa'
    });
  }
}

// Parse AI data
const aiLines = rawAIData.split('\n');
let currentAICat = 'AI Coding Assistants & Agents';
for (let line of aiLines) {
  line = line.trim();
  if (!line) continue;
  if (/^\d+\./.test(line)) {
    currentAICat = line.replace(/^\d+\.\s*/, '').trim();
    continue;
  }
  const name = cleanName(line);
  if (!name) continue;
  const key = name.toLowerCase();
  if (!toolsMap.has(key)) {
    toolsMap.set(key, {
      name,
      category: currentAICat,
      website: `https://${toSlug(name)}.com`,
      source: 'ai'
    });
  }
}

console.log(`Total unique tools extracted: ${toolsMap.size}`);
const outList = Array.from(toolsMap.values());
fs.writeFileSync(path.join(__dirname, 'extracted_tools.json'), JSON.stringify(outList, null, 2));
