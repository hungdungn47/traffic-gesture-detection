import React, { useState, useRef } from 'react';
import { Upload, Play, Send, AlertCircle } from 'lucide-react';
import { slugToString } from './utils';

interface DetectionResponse {
  result: string;
  // confidence: number;
}

function App() {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [detection, setDetection] = useState<DetectionResponse | null>(null);
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setSelectedVideo(file);
        setVideoUrl(URL.createObjectURL(file));
        setDetection(null);
        setError('');
      } else {
        setError('Please upload a valid video file');
      }
    }
  };

  const handleDetection = async () => {
    if (!selectedVideo) return;

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('frame', selectedVideo);

      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Detection failed');
      }

      const data = await response.json();
      console.log('Result: ', data);
      setDetection(data);
    } catch (err) {
      setError('Failed to process video. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-4 md:p-8 min-h-screen">
      <div className="grid grid-cols-[250px_1fr_250px] items-center gap-4 mb-6">
        <div className="flex justify-start">
          <img src="/is_logo.jpg" alt="IS Logo" className="h-16 object-cover" />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Traffic Gesture Detection
          </h1>
          <p className="text-gray-600 text-lg">
            Upload a video of traffic police gestures for automatic detection
          </p>
        </div>
        <div className="flex justify-end">
          <img src="/vietnam_flag.png" alt="Vietnam Flag" className="h-16 object-contain" />
        </div>
      </div>
      <div className='flex-1 flex p-10 bg-[url("/background.png")]'>
        <div className="w-[100%] bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-row">
            {/* Left Column - Video Upload and Preview */}
            <div className="w-2/3 p-6 border-r border-gray-200">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className='flex items-center justify-between'>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Upload Video:
                  </h2>
                  <label
                    className="flex items-center gap-4 justify-center w-[70%] h-16 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-white hover:bg-blue-50 transition-colors"
                  >
                    <input
                      type="file"
                      className="hidden"
                      accept="video/*"
                      onChange={handleVideoUpload}
                    />
                    <Upload className="w-5 h-5 text-blue-500 mb-2" />
                    <span className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </span>
                  </label>
                </div>

                {videoUrl && (
                  <div className="h-full bg-white p-4 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <Play className="w-5 h-5 mr-2 text-blue-500" />
                      Video Preview
                    </h2>
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      controls
                      className="w-full rounded-lg shadow-sm max-h-[280px]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Detection Controls and Results */}
            <div className="w-1/3 p-5">
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Gesture Detection
                  </h2>
                  <button
                    onClick={handleDetection}
                    disabled={!selectedVideo || isLoading}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center transition-all duration-200 ${!selectedVideo || isLoading
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md'
                      }`}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isLoading ? 'Processing...' : 'Detect Gestures'}
                  </button>

                  {error && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}
                </div>

                {detection && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Detection Results
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-gray-600 mb-1 text-xs">Detected Gesture</p>
                        <p className="text-base font-semibold text-gray-800">
                          {slugToString(detection.result)}
                        </p>
                      </div>
                      {/* <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-gray-600 mb-1 text-xs">Confidence Score</p>
                        <p className="text-base font-semibold text-gray-800">
                          {(detection.confidence * 100).toFixed(2)}%
                        </p>
                      </div> */}
                    </div>
                  </div>
                )}
                {detection && (
                  <div className="h-full bg-white p-4 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <Play className="w-5 h-5 mr-2 text-blue-500" />
                      Video Preview
                    </h2>
                    <video
                      // ref={videoRef}
                      src={videoUrl}
                      controls
                      className="w-full rounded-lg shadow-sm max-h-[280px]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;