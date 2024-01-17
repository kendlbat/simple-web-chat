import type { User } from "@auth/core/types";

function buf2hex(buffer: ArrayBuffer) {
    return [...new Uint8Array(buffer)]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("");
}

function getGravatarUrl(hash: string) {
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
}

export const getAvatar = async (user: User) => {
    if (user.image) return user.image;
    if (user.email) {
        const hash = await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(user.email),
        );
        return getGravatarUrl(buf2hex(hash));
    }
    return "/images/avatar-placeholder.svg";
};
