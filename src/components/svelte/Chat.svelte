<script lang="ts">
    import { Modal, Label, Button, Input } from "flowbite-svelte";

    let topicSelect = true;
    let topic = "default";

    let sendingMessage = "";

    let messages: Array<{
        message: string;
        date: string;
        username: string;
    }> = [];

    const colors = [
        "AliceBlue",
        "Aquamarine",
        "Aqua",
        "BlueViolet",
        "Brown",
        "Coral",
        "Crimson",
        "Green",
    ];

    function generateColorFromUsername(str: string): string {
        let sum = 0;
        for (let i = 0; i < str.length; i++) {
            sum += str.charCodeAt(i);
        }
        return colors[sum % colors.length];
    }

    async function fetchMessages() {
        if (!topicSelect)
            messages = await fetch(`/api/chat/${topic}`).then((res) =>
                res.json(),
            );
    }

    async function fetchMessageLoop() {
        await fetchMessages();
        setTimeout(fetchMessageLoop, 1000);
    }

    fetchMessageLoop();
</script>

<div>
    <Modal bind:open={topicSelect} class="md:w-1/2">
        <form
            action="javascript:void(0);"
            on:submit={() => {
                topicSelect = false;
            }}
        >
            <h3
                class="mb-4 text-xl font-medium text-gray-900 dark:text-white mt-[-20px]"
            >
                Choose topic
            </h3>
            <Label class="space-y-2">
                <span>Topic</span>
                <Input
                    type="text"
                    name="topic"
                    placeholder="default"
                    pattern="[a-zA-Z0-9]+"
                    required
                    bind:value={topic}
                />
            </Label>
            <Button type="submit" class="w-full mt-3">Submit</Button>
        </form>
    </Modal>
    <div class="mt-10 ml-3">
        {#each messages as message}
            <p>
                <!-- {message.date} -->
                <span
                    style={`color: ${generateColorFromUsername(message.username)};`}
                    class="w-[250px] inline-block"
                    >{message.username}
                </span>
                {message.message}
            </p>
        {/each}

        <form
            action="javascript:void(0);"
            on:submit={() => {
                fetch(`/api/chat/${topic}`, {
                    method: "POST",
                    body: sendingMessage,
                });
                messages.push({
                    message: sendingMessage,
                    date: new Date().toISOString(),
                    username: "Sending...",
                });
                messages = [...messages];
                sendingMessage = "";
            }}
            class="mt-10 w-1/3"
        >
            <Input
                type="text"
                name="message"
                placeholder="Message"
                required
                class="inline-block w-3/4"
                bind:value={sendingMessage}
            />

            <Button type="submit" class="mt-3">Send</Button>
        </form>
    </div>
</div>
