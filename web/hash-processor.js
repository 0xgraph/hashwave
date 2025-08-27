/**
 * Hash Wave - JavaScript Hash Processor
 * Converts hash strings (hex or base58) into nibbles for musical conversion.
 */

// Function to convert hex string to byte array
function hexToBytes(hexString) {
    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
        bytes.push(parseInt(hexString.substr(i, 2), 16));
    }
    return bytes;
}

// Note: For base58 support, we'll use the bs58 library
// Include this script tag in your HTML: 
// <script src="https://cdnjs.cloudflare.com/ajax/libs/bs58/4.0.1/index.min.js"></script>

function base58Decode(base58String) {
    if (typeof bs58 === 'undefined') {
        throw new Error('bs58 library not loaded. Please include the bs58 library.');
    }
    
    // Use the actual bs58 library
    const decoded = bs58.decode(base58String);
    return Array.from(decoded); // Convert Uint8Array to regular array
}

// Main hash processing function (equivalent to your Python version)
function processHash(hashString) {
    let bytes;
    
    try {
        if (hashString.startsWith('0x')) {
            // Hexadecimal format
            console.log(`Hash ${hashString} is hexadecimal...`);
            bytes = hexToBytes(hashString.slice(2));
        } else {
            // Assume base58 format
            console.log(`Hash ${hashString} is in base58. Converting...`);
            bytes = base58Decode(hashString);
        }
        
        console.log('Decoded bytes:', bytes);
        
        // Convert bytes to nibbles (same logic as Python)
        const nibbles = [];
        for (const byte of bytes) {
            const high = byte >> 4;      // Top 4 bits
            const low = byte & 0x0F;     // Bottom 4 bits
            nibbles.push(high);
            nibbles.push(low);
        }
        
        return nibbles;
        
    } catch (error) {
        throw new Error(`Invalid hash format: ${hashString}`);
    }
}

// Map nibbles to pitches (identical to your Python version)
function nibblesToPitches(nibbles) {
    const scale = [
        "C3", "D3", "E3", "F3", "G3", "A3", "B3",
        "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5"
    ];
    
    return nibbles.map(nibble => scale[nibble]);
}

// Combine everything (equivalent to your hash_to_pitches function)
function hashToPitches(hashString) {
    const nibbles = processHash(hashString);
    return nibblesToPitches(nibbles);
}

// Test function
function testHashProcessing() {
    const testHash = '0xeF9442f0f83ebc3C0f4E9A839a17252Dc2612500';
    console.log('=== Testing Hash Processing ===');
    console.log('Input hash:', testHash);
    
    try {
        const pitches = hashToPitches(testHash);
        console.log('Generated pitches:', pitches);
        console.log('Number of notes:', pitches.length);
    } catch (error) {
        console.error('Error:', error.message);
    }
}