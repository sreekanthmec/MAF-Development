import TrainerCardHeader from "./TrainerCardHeader";

export default function TopTrainerCard({
    trainer,
    onClick,
  }: {
    trainer: {
      name: string;
      rate: string; // e.g. "3 / hour"
      meta?: string; // e.g. "27F"
      imageUrl: string;
      schedule: { day: string; time: string }[];
    };
    onClick?: () => void;
  }) {
    return (
      <div className="w-[300px] flex-shrink-0 bg-white border border-[#DEDEDE]">
        {/* Reusable header (RED variant for Top Trainers) */}
        <TrainerCardHeader
          name={trainer.name}
          rate={trainer.rate}
          meta={trainer.meta}
          imageSrc={trainer.imageUrl}
          variant="red"
        />
  
        {/* Schedule rows */}
        <div className="px-5 py-4">
          {trainer.schedule.map((s, i) => (
            <div key={i} className="flex items-center justify-between py-2 text-[#3A3A3A]">
              <span className="text-[16px]">{s.day}</span>
              <span
                className={s.time.toLowerCase() === "busy" ? "text-[#EB2726] font-semibold" : ""}
              >
                {s.time}
              </span>
            </div>
          ))}
        </div>
  
        {/* Optional click target */}
        {onClick && <button onClick={onClick} className="absolute inset-0" aria-label="Open" />}
      </div>
    );
  }
  