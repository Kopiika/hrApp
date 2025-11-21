import {useMemo} from 'react';

export function useYearsWorked (startDate) {
	return useMemo(() => {
		if (!startDate) {
		  return {
			 totalYears: 0,
			 monthsWorked: 0,
			 reminder: null,
		  };
		}
		
		// Parse dates
		const start = new Date(startDate);
		const today = new Date();

		// Years difference
		const yearsWorked = today.getFullYear() - start.getFullYear();

		// Check if anniversary happened this year
		const hasHadAnniversary =
		  today.getMonth() > start.getMonth() ||
		  (today.getMonth() === start.getMonth() &&
			 today.getDate() >= start.getDate());
  
		const totalYears = hasHadAnniversary ? yearsWorked : yearsWorked - 1;
  
		// Months worked (more precise)
		const monthsWorked =
		  (today.getFullYear() - start.getFullYear()) * 12 +
		  (today.getMonth() - start.getMonth());
  
		// Generate reminder
		let reminder = null;
  
		if (totalYears > 0 && totalYears % 5 === 0) {
		  reminder = `🎉 Anniversary — ${totalYears} years worked!`;
		} else if (monthsWorked < 6) {
		  reminder = "🔔 Probation review required.";
		}
  
		return { totalYears, monthsWorked, reminder };
	 }, [startDate]); 

}
	