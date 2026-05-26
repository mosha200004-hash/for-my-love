import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, ChevronRight } from "lucide-react";

const Button = ({
  children,
  className = "",
  ...props
}: any) => (
  <button
    className={`bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-2xl transition-all shadow-lg ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function EidLoveWebsite() {
  const [page, setPage] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const nextPage = () => {
    setPage((p) => Math.min(p + 1, 3));
  };

  const pages = [
    <QuizPage nextPage={nextPage} key="0" />,
    <WelcomePage nextPage={nextPage} key="1" />,
    <GalleryPage nextPage={nextPage} key="2" />,
    <LetterPage key="3" />
  ];

  useEffect(() => {
    const tryPlay = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(() => {});
      }
    };

    document.addEventListener("click", tryPlay, {
      once: true
    });

    return () =>
      document.removeEventListener("click", tryPlay);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1238] via-[#2d1b69] to-[#5b3b8a] overflow-hidden relative p-4">

      {/* Moon */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute top-10 left-10 text-7xl"
      >
        🌙
      </motion.div>

      {/* Stars */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            repeat: Infinity,
            duration: 2 + (i % 3)
          }}
          className="absolute text-yellow-200"
          style={{
            left: `${(i * 4) % 100}%`,
            top: `${(i * 7) % 100}%`
          }}
        >
          ✦
        </motion.div>
      ))}

      {/* Sheep */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, 20, 0],
            y: [0, -8, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 4 + i
          }}
          className="absolute text-4xl"
          style={{
            left: `${i * 18}%`,
            bottom: `${(i % 2) * 10}%`
          }}
        >
          🐑✨
        </motion.div>
      ))}

      {/* Music */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3
        }}
        className="fixed bottom-5 left-5 z-50 bg-white/10 backdrop-blur-xl rounded-full px-3 py-2 shadow-2xl flex items-center gap-3 border border-pink-300/20"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "linear"
          }}
          className="w-16 h-16 rounded-full bg-black flex items-center justify-center border-[5px] border-gray-800"
        >
         <img
  src="/amr-diab.png"
  alt="Amr Diab"
  className="w-10 h-10 rounded-full object-cover"
 />
        </motion.div>

        <div>
          <p className="text-pink-100 text-sm font-bold">
            أغنيتنا ❤️
          </p>
        </div>

        <audio ref={audioRef} loop autoPlay>
          <source
            src="/song.mp3"
            type="audio/mp3"
          />
        </audio>
      </motion.div>

      <div className="flex items-center justify-center min-h-screen">
        {pages[page]}
      </div>
    </div>
  );
}

function WelcomePage({
  nextPage
}: {
  nextPage: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/90 p-10 rounded-[2rem] text-center shadow-2xl max-w-xl"
    >
      <h1 className="text-5xl font-bold text-pink-600 mb-4">
        عيد سعيد يا حبيبتي ❤️🐑
      </h1>

      <p className="text-gray-700 mb-6">
        عندي ليكي مفاجأة صغيرة 💌
      </p>

      <Button onClick={nextPage}>
        افتحي المفاجأة
        <ChevronRight className="inline ml-2" />
      </Button>
    </motion.div>
  );
}

function GalleryPage({
  nextPage
}: {
  nextPage: () => void;
}) {
  return (
    <div className="bg-white/90 p-8 rounded-[2rem] shadow-2xl text-center max-w-5xl">

      <h2 className="text-4xl text-pink-600 font-bold mb-8">
        ذكرياتنا 📸
      </h2>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((img) => (
          <img
            key={img}
            src={`/photo${img}.jpg`}
            className="rounded-[2rem] h-60 w-full object-cover shadow-xl"
          />
        ))}
      </div>

      {/* Video */}
      <div className="mb-8">
        <h3 className="text-2xl text-pink-500 font-bold mb-4">
          فيديو لينا 🎥❤️
        </h3>

        <div className="flex justify-center">
          <div className="bg-white/20 backdrop-blur-xl p-3 rounded-[2rem] shadow-2xl border border-pink-200/30">
            <video
              controls
              className="w-[320px] md:w-[420px] h-[500px] object-cover rounded-[1.5rem]"
            >
              <source
                src="/video.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>

      <Button onClick={nextPage}>
        عندي رسالة ليكي 💌
      </Button>
    </div>
  );
}

function LetterPage() {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-[2rem] p-10 shadow-2xl text-center max-w-xl"
    >
      <Heart
        className="mx-auto text-pink-500 mb-4"
        size={50}
      />

      <h2 className="text-4xl font-bold text-pink-600 mb-4">
        رسالة صغيرة ❤️
      </h2>

      <p className="text-gray-700 text-lg leading-9">
        كل سنة وانتي معايا ❤️
        <br />
        وجودك في حياتي أحلى حاجة حصلتلي 🥹🐑
      </p>
    </motion.div>
  );
}

function QuizPage({
  nextPage
}: {
  nextPage: () => void;
}) {
  const [answers, setAnswers] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [celebrate, setCelebrate] =
    useState(false);

  const questions = [
    {
      question: "مين قال بحبك الأول؟ 😂",
      options: ["هي", "صاحبها", "إنت 😎"]
    },
    {
      question: "أنا بحب أكل إيه؟ 🍟",
      options: ["سلطة", "سمك", "فرايز 🍟"]
    },
    {
      question:
        "مين بيراضي التاني لما نزعل؟ 💞",
      options: [
        "محدش 😂",
        "هي",
        "إنت ❤️"
      ]
    }
  ];

  const handleAnswer = (
    qIndex: number,
    optionIndex: number
  ) => {
    const updatedAnswers = [...answers];
    updatedAnswers[qIndex] = optionIndex;
    setAnswers(updatedAnswers);

    const updatedFeedback = [...feedback];

    updatedFeedback[qIndex] =
      optionIndex === 2
        ? "🥹 صح يا حبيبتي"
        : "😠 غلط يا حبيبتي";

    setFeedback(updatedFeedback);
  };

  const handleSubmit = () => {
    const allCorrect =
      questions.every(
        (_, i) => answers[i] === 2
      );

    if (allCorrect) {
      setCelebrate(true);

      setTimeout(() => {
        nextPage();
      }, 2500);
    }
  };

  return (
    <>
      {celebrate && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: 500,
                opacity: 0
              }}
              animate={{
                y: -800,
                opacity: 1
              }}
              transition={{
                duration: 4,
                delay: i * 0.1
              }}
              className="absolute text-4xl"
              style={{
                left: `${(i * 5) % 100}%`
              }}
            >
              🎈🌹
            </motion.div>
          ))}

          <motion.div
            initial={{
              scale: 0.5,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-pink-400"
          >
            🥹❤️ شاطرة يا حبيبتي
          </motion.div>
        </div>
      )}

      <div className="bg-white/90 rounded-[2rem] p-10 shadow-2xl w-[720px] max-w-[95vw] text-center"
      >
       <h2 className="text-5xl font-extrabold text-pink-500 mb-3 tracking-wide italic">
  Quick quiz for you 💌
</h2>

<p className="text-lg text-[#ec4899] font-medium mb-8 italic">
    جاوب صح عشان تعدي 😌✨
</p>

        <div className="space-y-6 text-right">
          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="bg-pink-50 rounded-[1.5rem] p-5"
            >
              <p className="font-bold mb-3">
                {q.question}
              </p>

              <div className="grid gap-2">
                {q.options.map(
                  (option, oIndex) => (
                    <button
                      key={oIndex}
                      onClick={() =>
                        handleAnswer(
                          qIndex,
                          oIndex
                        )
                      }
                      className={`p-4 rounded-xl border ${
                        answers[qIndex] ===
                        oIndex
                          ? "bg-pink-100 border-pink-400"
                          : "bg-white"
                      }`}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>

              {feedback[qIndex] && (
                <p className="mt-3 font-bold">
                  {feedback[qIndex]}
                </p>
              )}
            </div>
          ))}
        </div>

        <Button
          className="mt-8"
          onClick={handleSubmit}
        >
          تأكيد الإجابات 💌
        </Button>
      </div>
    </>
  );
}