
 interface Tactic {
    id: string;
    fen: string;
    blunderMove: string;
    solution: string[];
}
const TACTICS: Tactic[] = [
  {
    id: "1",
    blunderMove: "Rg1",
    fen: "8/5p2/5N2/5p2/1p3P2/3k3p/P2r2r1/3RR2K w - - 3 42",
    solution: ["Rh2#"],
  },
  {
    id: "2",
    blunderMove: "g3",
    fen: "r4rk1/1p3pp1/p2p1n1p/3P4/1P1Q1Bqn/P1N5/2B2PPP/2R1R1K1 w - - 0 1",
    solution: ["Nf3+", "Kg2", "Nxd4"],
  },
  {
    id: "3",
    blunderMove: "Qd3",
    fen: "rn1qr1k1/ppp3pp/6b1/5p2/1bPP3P/4BP2/1P1NQ1P1/2KR1B1R w - - 0 1",
    solution: ["f4"],
  },
  {
    id: "4",
    blunderMove: "Qxb2",
    fen: "r1b1r1k1/pp2bppp/1qn2n2/3p4/2pP4/2P1BN1P/PPBQ1PP1/RN3RK1 b - - 0 1",
    solution: ["Bxh7+", "Kxh7", "Qxb2"],
  },
  {
    id: "5",
    blunderMove: "Bg3",
    fen: "r1b1r1k1/p1p2p2/2pp1n1p/2b1q1p1/4P2B/2NB3P/PPP2PP1/R2QR1K1 w - g6 0 1",
    solution: ["Qxg3"],
  },
  {
    id: "6",
    blunderMove: "Rxe4",
    fen: "r2qkb1r/pp1bpppp/3p4/1B6/3nn3/2P5/PP3PPP/RNBQR1K1 w kq - 0 1",
    solution: ["Nxb5"],
  },
  {
    id: "7",
    blunderMove: "Rxe7",
    fen: "2kr3r/p1p1bpp1/2p2n1p/8/8/1P6/P1P1RPPP/RNB3K1 w - - 1 16",
    solution: ["Rd1+", "Re1", "Rxe1#"]
  },

];

export default TACTICS;