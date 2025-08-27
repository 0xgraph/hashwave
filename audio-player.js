/**
 * Hash Wave - Audio Player using Tone.js
 * Plays melodies with square wave synthesizer
 */

class HashWavePlayer {
    constructor() {
        this.synth = null;
        this.isInitialized = false;
    }
    
    async initialize() {
        if (this.isInitialized) return;
        
        try {
            // Create square wave synthesizer (like SCAMP's 'square')
            this.synth = new Tone.Synth({
                oscillator: {
                    type: 'square'
                },
                envelope: {
                    attack: 0.01,
                    decay: 0.1,
                    sustain: 0.5,
                    release: 0.1
                }
            }).toDestination();
            
            this.isInitialized = true;
            console.log('HashWavePlayer initialized with square wave');
        } catch (error) {
            console.error('Failed to initialize audio:', error);
            throw error;
        }
    }
    
    async playMelody(pitches, noteLength = 0.5, volume = 0.5) {
        if (!this.isInitialized) await this.initialize();
        
        const now = Tone.now(); // current time in Tone.js context

        pitches.forEach((pitch, index) => {
            const startTime = now + (index * noteLength);
            this.synth.triggerAttackRelease(pitch, noteLength * 0.8, startTime, volume);
        });
        
        return pitches.length * noteLength;
    }
    
    async playHashMelody(hashString, noteLength = 0.5, volume = 0.5) {
        try {
            const pitches = hashToPitches(hashString);
            const duration = await this.playMelody(pitches, noteLength, volume);
            return { pitches, duration };
        } catch (error) {
            console.error('Error playing hash melody:', error);
            throw error;
        }
    }
    
    stop() {
        if (this.synth) {
            this.synth.triggerRelease();
        }
    }
}

// Create global player instance
const hashWavePlayer = new HashWavePlayer();