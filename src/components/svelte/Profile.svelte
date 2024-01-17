<script lang="ts">
    import {
        Drawer,
        Sidebar,
        SidebarWrapper,
        CloseButton,
        SidebarGroup,
        SidebarItem,
    } from "flowbite-svelte";
    import { ArrowRightFromBracketSolid } from "flowbite-svelte-icons";
    import { sineIn } from "svelte/easing";
    import { signOut } from "auth-astro/client";

    export let avatarUrl: string;
    export let userName: string;
    export let userDetail: string;

    let hidden = true;

    const transitionParams = {
        x: 320,
        duration: 200,
        easing: sineIn,
    };

    const iconClass =
        "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white";
</script>

<div class="text-gray-200">
    <div
        class="align-center group inline-flex gap-4 aspect-square h-[4.5rem] rounded-xl fixed right-2 top-2"
        id="user-profile"
        on:click={() => (hidden = !hidden)}
        on:keydown={(e) => {
            if (e.key === "Enter") {
                hidden = !hidden;
            }
        }}
        role="button"
        tabindex="0"
    >
        <img src={avatarUrl} alt="Avatar" class="h-full w-full rounded-full" />
    </div>

    <Drawer placement="right" {hidden} transitionType="fly" {transitionParams}>
        <div class="flex items-center">
            <h5 class="uppercase font-semibold">Profile</h5>
            <CloseButton on:click={() => (hidden = true)} />
        </div>
        <div class="flex flex-col">
            <div class="mb-3 w-full flex justify-center items-center">
                <img
                    src={avatarUrl}
                    alt="Avatar"
                    class="w-28 h-28 rounded-full"
                />
            </div>
            <div class="flex flex-col pl-4">
                <div>
                    <p class="whitespace-nowrap text-nowrap">{userName}</p>
                    <p
                        class="whitespace-nowrap text-nowrap text-[0.8em] text-gray-400"
                    >
                        {userDetail}
                    </p>
                </div>
            </div>
        </div>
        <Sidebar>
            <SidebarWrapper>
                <SidebarGroup>
                    <SidebarItem
                        label="Sign out"
                        href="javascript:void(0);"
                        on:click={() => signOut({ callbackUrl: "/" })}
                    >
                        <svelte:fragment slot="icon">
                            <ArrowRightFromBracketSolid class={iconClass} />
                        </svelte:fragment>
                    </SidebarItem>
                </SidebarGroup>
            </SidebarWrapper>
        </Sidebar>
    </Drawer>
</div>
