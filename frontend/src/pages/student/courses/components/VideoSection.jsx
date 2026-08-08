import { PlayCircle } from 'lucide-react'

export default function VideoSection({ lesson }) {
    if (!lesson) {
        return (
            <div className="rounded-xl bg-white p-6 shadow">
                No lesson available.
            </div>
        )
    }
    return (

        <div className="overflow-hidden rounded-2xl bg-white shadow">
            {lesson.videoUrl ? (
                <div className="relative aspect-video w-full bg-black">
                    <iframe
                        src={lesson.videoUrl}
                        title={lesson.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full border-0"
                    />
                </div>
            ) : (
                <div className="flex aspect-video items-center justify-center bg-gray-900">
                    <div className="text-center text-white">
                        <PlayCircle size={72} className="mx-auto" />
                        <h2 className="mt-4 text-2xl font-bold">{lesson.title}</h2>
                        <p className="mt-2 text-gray-300">Video Player Placeholder</p>
                        <p className="mt-1 text-sm text-gray-400">Duration: {lesson.duration}</p>
                    </div>
                </div>
            )}
        </div>

    )

}