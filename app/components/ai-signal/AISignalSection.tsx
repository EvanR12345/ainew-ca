import { articles } from "../../lib/articles";
import { AISignalExperience } from "./AISignalExperience";
import { buildSignalData, type SignalLocale } from "./signal-data";

export function AISignalSection({ locale = "en" }: { locale?: SignalLocale }) {
  return <AISignalExperience data={buildSignalData(articles, locale)} />;
}
