'use client';
import './Upload.scss';
import { 
  useState,
  useEffect, 
  useCallback,
  ChangeEvent
} from 'react';
import cn from 'classnames';

export const Upload = () => {
  const [file, setFile] = useState<File>();

  useEffect(() => {
    console.log(file);
  }, [file])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    // Uploading the file using axios service
    
  };

  return (
    <div className="upload">
      <h1 className="upload__title">
        Video CV.
      </h1>

      <div className="upload__text">
        Adding a video cv will bring you more chances for a potentional employer.
      </div>

      <label
        className="upload__label"
        htmlFor="upload__input"
      >
        <div className="upload__label-image"></div>

        <div className="upload__label-text">
          Add video CV
        </div>
      </label>

      <input
        type="file"
        accept="video/*"
        id='upload__input'
        className="upload__input"
        onChange={handleFileChange}
      />

      <div
        className='upload__file-info'
      >
        {file && `${file.name} - ${file.type}`}
      </div>

      <div
        onClick={handleUploadClick}
        className='upload__upload-button'
      >
        Upload
      </div>
    </div>
  )
}