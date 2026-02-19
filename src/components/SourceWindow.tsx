import Image from 'next/image';

type SourceWindowProps = {
  title: string;
  images: string[];
  text?: string;
};

export function SourceWindow({ title, images, text }: SourceWindowProps) {
  return (
    <div className="space-y-3 text-sm">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-slate-600">{text ?? 'Fuente de información simulada para la demo.'}</p>
      <div className="grid gap-3 md:grid-cols-2">
        {images.map((image) => (
          <Image key={image} src={image} alt={title} width={620} height={320} className="rounded border border-slate-300" />
        ))}
      </div>
    </div>
  );
}
