export const useStudentOperations = () => {
    const { $axios } = useNuxtApp();
    const api = $axios();

    // Keep track of original values
    const originalValues = ref({});

    // Initialize tracking
    const initializeTracking = (student) => {
        originalValues.value = { ...student };
    };

    // Map frontend keys to backend keys
    const keyMapping = {
        'bed_id': 'bed',
        'hostel_id': 'hostel',
        'level_id': 'level',
        'room_id': 'room'
    };

    const getChangedValues = (currentStudent) => {
        const changes = {};

        Object.keys(currentStudent).forEach(key => {
            // Only include if value has changed
            if (currentStudent[key] !== originalValues.value[key]) {
                // Map the key if it needs to be mapped, otherwise use the original key
                const backendKey = keyMapping[key] || key;
                changes[backendKey] = currentStudent[key];
            }
        });

        return changes;
    };

    const updateStudent = async (student) => {
        try {
            const changedValues = getChangedValues(student);
            console.log('Sending changes to backend:', changedValues);

            if (Object.keys(changedValues).length === 0) {
                return { success: true, message: 'No changes to update' };
            }

            const response = await api.patch(`/students/${student.id}/`, changedValues);

            // Update original values after successful update
            initializeTracking(student);

            return { success: true, data: response.data };
        } catch (error) {
            console.error('Update error:', error.response?.data || error.message);
            return { success: false, error: error.response?.data || error.message };
        }
    };

    const deleteStudent = async (studentId) => {
        try {
            await api.delete(`/students/${studentId}/`);
            return { success: true };
        } catch (error) {
            console.error('Delete error:', error.response?.data || error.message);
            return { success: false, error: error.response?.data || error.message };
        }
    };

    return {
        updateStudent,
        deleteStudent,
        initializeTracking
    };
};