/**
 * StarPoint — extended BABYLON particle with star-catalog metadata.
 */
export interface StarPoint extends BABYLON.Particle {
    /** 
     * Unique star ID  
     * Integer ≥ 0 
     */
    i: number;

    /** 
     * Name / catalog identifier  
     * Non-empty string 
     */
    n: string;

    /**
     * Position in 3D space  
     * Finite numbers (likely light-year or custom coordinate units)
     */
    x: number;
    y: number;
    z: number;

    /**
     * p — could be parallax or magnitude  
     * Must be a finite number
     */
    p: number;

    /**
     * N — some numeric attribute (possibly distance, brightness, etc.)  
     * Must be finite
     */
    N: number;

    /**
     * K — color values (RGB)  
     * Each channel in range 0–1 inclusive
     */
    K: {
        r: number; // 0 ≤ r ≤ 1
        g: number; // 0 ≤ g ≤ 1
        b: number; // 0 ≤ b ≤ 1
    };
}
