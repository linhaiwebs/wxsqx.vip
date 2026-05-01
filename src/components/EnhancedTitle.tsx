export default function EnhancedTitle() {
  return (
    <div className="flex flex-col items-center gap-3 px-4">
      <div className="inline-block bg-black text-[#ff6b00] px-3 py-1 border-[3px] border-black font-headline text-xs font-bold uppercase tracking-widest">
        STOCK_ALERT _ 01
      </div>
      <h2 className="font-headline text-[32px] leading-[0.9] font-black tracking-tighter text-black break-words text-center">
        <span className="bg-[#ff6b00] px-1 box-decoration-clone leading-tight text-white">「AI株価診断で、</span><br />
        <span className="bg-[#ff6b00] px-1 box-decoration-clone leading-tight text-white">未来を予測。」</span>
      </h2>
    </div>
  );
}
