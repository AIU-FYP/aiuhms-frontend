export const useStudentFields = (hostels, student, religions) => {
    const options = reactive({
        status: [
            {value: "active", label: "Active"},
            {value: "inactive", label: "Inactive"},
            {value: "graduated", label: "Graduated"},
            {value: "terminated", label: "Terminated"},
        ],
        gender: [
            {value: "male", label: "Male"},
            {value: "female", label: "Female"}
        ],
        religion: Array.isArray(religions)
            ? religions
            : Array.from(religions.values()),
        hostel: [],
        level: [],
        room: [],
        bed: []
    });

    watch([hostels, () => student.value?.gender], ([newHostels, newGender]) => {
        if (newHostels && newGender) {
            options.hostel = newHostels
                .filter(h => h.gender === newGender)
                .map(h => ({value: h.id, label: h.name}));
        }
    }, {immediate: true});

    // Update level options
    watch([hostels, () => student.value?.hostel_id], ([newHostels, newHostelId]) => {
        if (newHostels && newHostelId) {
            const hostel = newHostels.find(h => h.id === newHostelId);
            options.level = hostel?.levels?.map(l => ({
                value: l.id,
                label: `Level ${l.number}`
            })) || [];
        }
    }, {immediate: true});

    // Update room options
    watch([hostels, () => student.value?.hostel_id, () => student.value?.level_id],
        ([newHostels, newHostelId, newLevelId]) => {
            if (newHostels && newHostelId && newLevelId) {
                const hostel = newHostels.find(h => h.id === newHostelId);
                const level = hostel?.levels?.find(l => l.id === newLevelId);
                options.room = level?.room_details?.map(r => ({
                    value: r.id,
                    label: `Room ${r.number}`
                })) || [];
            }
        }, {immediate: true});

    // Update bed options
    watch([hostels, () => student.value?.hostel_id, () => student.value?.level_id, () => student.value?.room_id],
        ([newHostels, newHostelId, newLevelId, newRoomId]) => {
            if (newHostels && newHostelId && newLevelId && newRoomId) {
                const hostel = newHostels.find(h => h.id === newHostelId);
                const level = hostel?.levels?.find(l => l.id === newLevelId);
                const room = level?.room_details?.find(r => r.id === newRoomId);
                options.bed = room?.beds?.map(b => ({
                    value: b.id,
                    label: `Zone ${b.bed_number} (${b.status})`
                })) || [];
            }
        }, {immediate: true});

    return {
        fields: [
            {label: 'ID', key: 'id', editable: false, type: 'input'},
            {label: 'Status', key: 'status', editable: true, type: 'select', optionsKey: 'status'},
            {label: 'Name', key: 'name', editable: false, type: 'input'},
            {label: 'Student ID', key: 'student_id', editable: false, type: 'input'},
            {label: 'Passport No', key: 'passport', editable: true, type: 'input'},
            {label: 'Date of Arrival', key: 'arrival_date', editable: false, type: 'input'},
            {label: 'WhatsApp No', key: 'phone', editable: true, type: 'input'},
            {label: 'Student Email', key: 'email', editable: true, type: 'input'},
            {label: 'Nationality', key: 'nationality', editable: false, type: 'input'},
            {label: 'Program/Major', key: 'major', editable: true, type: 'input'},
            {label: 'Gender', key: 'gender', editable: true, type: 'select', optionsKey: 'gender'},
            {label: 'Religion', key: 'religion', editable: true, type: 'select', optionsKey: 'religion'},
            {label: 'Block Name', key: 'hostel_id', editable: true, type: 'select', optionsKey: 'hostel'},
            {label: 'Level No', key: 'level_id', editable: true, type: 'select', optionsKey: 'level'},
            {label: 'Room No', key: 'room_id', editable: true, type: 'select', optionsKey: 'room'},
            {label: 'Bed', key: 'bed_id', editable: true, type: 'select', optionsKey: 'bed'}
        ],
        options
    };
};