import { motion } from "framer-motion";
import '../../styles/st-spinner.css'

function LoadingSpinner() {
  return (
		<div className='loading-spinner'>
			{/* Simple Loading Spinner */}
			<motion.div
				className='spinner'
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			/>
		</div>
	);
}

export default LoadingSpinner