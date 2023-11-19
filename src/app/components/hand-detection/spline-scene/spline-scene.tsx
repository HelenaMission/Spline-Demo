import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DynamicSpline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function SplineScene() {
  const splineRef = useRef<any>();
  console.log('splineRef:', splineRef);
  

  const handleMouseDown = (event: any) => {
    console.log('MOUSEDOWN--event:', event); 
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    document.addEventListener('mouseDown', handleMouseDown);

    
    const handlePointerDown = (event: any) => {
      console.log('event:', event);
      console.log('Hand Over - Custom Pointer');
      console.log('spineRef.current:', splineRef.current);
      // Trigger spline events on mouse move
            
      const objectId = 'Little';
      console.log('objectId:', objectId);

      const position = {
        x: event.clientX,
        y: event.clientY,
      }
      console.log('position:', position);
      splineRef.current.emitEvent('mouseDown', objectId);
    };

    

    


    const checkAndAddListener = () => {
      const customPointer = document.querySelector('.playerPointer');
      console.log('Adding Custom Pointer Element:', customPointer);

      if (customPointer) {
        console.log('Custom Pointer Found');
        document.addEventListener('mouseenter', handlePointerDown as EventListener);

        clearInterval(intervalId);
      }
    };

    // Check for the custom pointer element every 100ms
    intervalId = setInterval(checkAndAddListener, 100);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('mouseenter', handlePointerDown as EventListener);
    };
  }, []); /// Effect runs once on component mount

  return (
    <div>
      <DynamicSpline
        scene='https://prod.spline.design/UgxUAdFKCn948e1Q/scene.splinecode'
        onLoad={(spline: any) => {
          splineRef.current = spline;
        }}
        onMouseDown={(event: any) => {
          console.log('Event:', event);
        }}
      />
    </div>
  );
}
