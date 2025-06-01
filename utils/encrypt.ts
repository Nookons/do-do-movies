import crypto from "crypto";

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY; // В route.ts
const IV_LENGTH = 16;

export function encrypt(text: string): string {

    if (!ENCRYPTION_KEY) {
        return "error"
    }

    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'base64'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string): string {

    if (!ENCRYPTION_KEY) {
        return "error"
    }

    const textParts = text.split(':');
    const iv = Buffer.from(textParts[0], 'hex');
    const encryptedText = Buffer.from(textParts[1], 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'base64'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}