import React from "react";

const rawKey = new Uint8Array([
  1, 2, 3, 4, 5, 6, 7, 8,
  9, 10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20, 21, 22, 23, 24,
  25, 26, 27, 28, 29, 30, 31, 32
]);

let cachedKey = null;

async function getKey() {
  if (cachedKey) return cachedKey;

  cachedKey = await crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );

  return cachedKey;
}
// 🔥 SAFE base64 encode
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);

  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
}

// 🔥 SAFE base64 decode
function base64ToArrayBuffer(base64) {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

// 🔐 ENCRYPT
export async function encryptMessage(message) {
  const key = await getKey();

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(message);

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded
  );

  return {
    ciphertext: arrayBufferToBase64(encrypted), // ✅ correct
    iv: arrayBufferToBase64(iv),                // ✅ correct
  };
}

// 🔓 DECRYPT
export async function decryptMessage(ciphertext, iv) {
  try {
    const key = await getKey();

    // 🔥 FIX: handle broken padding
    const fixBase64 = (str) =>
      str + "=".repeat((4 - (str.length % 4)) % 4);

    const cipherBytes = base64ToArrayBuffer(fixBase64(ciphertext));
    const ivBytes = base64ToArrayBuffer(fixBase64(iv));

    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: ivBytes },
      key,
      cipherBytes
    );

    return new TextDecoder().decode(decrypted);

  } catch (err) {
    console.error("DECRYPT ERROR:", err);
    return "🔒 Decryption failed";
  }
}