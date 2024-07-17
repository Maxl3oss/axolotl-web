import { Fragment, memo, useEffect, useRef, useState } from 'react';
import { Handle, Position, NodeProps, NodeToolbar } from 'reactflow';
import axios from 'axios';
import { YOUTUBE_KEY } from '@/lib/service';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { PenIcon, XCircle, PlayCircle, ImagePlay, LucidePlay } from 'lucide-react';

type NodeYoutubeData = {
  link: string;
  onChangeText: (link: string) => void;
  onDelete: () => void;
};

const NodeYoutube = ({ data }: NodeProps<NodeYoutubeData>) => {
  const [videoDetails, setVideoDetails] = useState({ title: '', thumbnailUrl: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editedLink, setEditedLink] = useState(data.link);
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [isEditing, editedLink]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const linkData = editedLink || data.link;
      const videoId = extractVideoId(linkData);
      if (videoId) {
        try {
          const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
            params: {
              part: 'snippet',
              id: videoId,
              key: YOUTUBE_KEY,
            }
          });
          const videoData = response.data.items[0].snippet;
          setVideoDetails({
            title: videoData.title,
            thumbnailUrl: videoData.thumbnails.default.url
          });
        } catch (error) {
          console.error('Error fetching video details:', error);
        }
      }
    };

    if (!data.link && data.link === "" && editedLink === "") {
      setIsEditing(true);
      return;
    }
    fetchVideoDetails();
  }, [data.link, editedLink]);

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedLink(event.target.value);
  };

  const handleLabelBlur = () => {
    setIsEditing(false);
    data.onChangeText(editedLink);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="youtube-node" style={{ width: '320px' }}>
      <NodeToolbar
        className="bg-transparent space-x-1"
        position={Position.Top}
      >
        <Badge className="cursor-pointer" onClick={() => setIsEditing(true)}>
          <PenIcon className="icon-sm text-secondary hover:text-green-500" />
        </Badge>
        <Badge className="cursor-pointer" onClick={data.onDelete}>
          <XCircle className="icon-sm text-secondary hover:text-red-500" />
        </Badge>
      </NodeToolbar>
      <Handle type="target" position={Position.Top} />
      {isEditing ? (
        <input
          ref={ref}
          value={editedLink}
          onChange={handleLabelChange}
          onBlur={handleLabelBlur}
          autoFocus
          className="input-clear w-full resize-none overflow-hidden"
          style={{ height: 'auto', width: '100%' }}
        />
      ) : (
        <Fragment>
          {isPlaying ? (
            <iframe
              width="320"
              height="180"
              src={`https://www.youtube.com/embed/${extractVideoId(editedLink || data.link)}?autoplay=1`}
              title={videoDetails.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div onClick={togglePlay} style={{ cursor: 'pointer', position: 'relative' }}>
              <Image width={280} height={240} src={videoDetails.thumbnailUrl} alt={videoDetails.title} className="youtube-thumbnail" />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(0,0,0,0.7)',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <LucidePlay className="text-white" size={24} />
              </div>
            </div>
          )}
          <p className="youtube-name">{videoDetails.title}</p>
        </Fragment>
      )
      }
      <Handle type="source" position={Position.Bottom} />
    </div >
  );
};

function extractVideoId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

export default memo(NodeYoutube);