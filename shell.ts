export async function exec(...cmd: string[]): Promise<string> {
    const command = new Deno.Command(cmd[0], {
        args: cmd.slice(1), // The rest of the command arguments
        stdout: "piped", // Capture standard output
        stderr: "piped", // Capture standard error
    });

    const { success, stdout } = await command.output();
    if (success) {
        return new TextDecoder().decode(stdout);
    }
    throw `failed to capture output while executing ${cmd.join(" ")}`;
}
