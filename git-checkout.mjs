import readline from "readline/promises";
import { spawn } from "child_process";

const PREFIX = "ui/";

const input = process.argv
  .map((a, i) => (i >= 2 ? a.trim().replaceAll(/-+/g, "") : null))
  .filter(Boolean)
  .join("-")
  .replaceAll(/\s+/g, "-")
  .replaceAll(/[.,'"$£%&?+_()[\]]+/g, "")
  .toLowerCase();

if (!input) {
  console.error("No branch name");
  process.exit(1);
}

const branch = `${PREFIX}${input}`;
console.log(branch);

const prompt = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await rl.question("Happy? [Y/n]\n");

  rl.close();

  return answer;
};

const happy = (await prompt()).trim().charAt(0);

if (happy === "" || happy === "Y" || happy === "y") {
  const git = spawn("git", ["checkout", "-b", branch]);

  git.stderr.on("data", (data) => console.error(data.toString().trim()));

  git.on("exit", (code) => {
    if (code !== 0) {
      console.error(`Exit code [${code}]`);
    }
  });
}
