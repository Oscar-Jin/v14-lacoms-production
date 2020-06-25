export const selectStudents = state => state.students;
export const selectMemberships = state => state.memberships;
export const selectSubscriptions = state => state.subscriptions;
export const selectTickets = state => state.tickets;
export const selectReservations = state => state.reservations;
export const selectPayments = state => state.payments;
export const selectTimetables = state => state.timetables;
export const selectLessons = state => state.lessons;

export const selectStudentFilter = state => state.filter.studentName;
export const selectMembershipsFilter = state => state.filter.studentMembership;
export const selectShowAddStudentModal = state => state.show.addStudentModal;
export const selectShowAddMembershipModal = state =>
  state.show.addMembershipModal;
export const selectShowAddSubscriptionModal = state =>
  state.show.addSubscriptionModal;
export const selectShowEditStudentModalBundle = state => {
  const { editStudentModal, referenceKey, noteReferenceKey } = state.show;
  return {
    editStudentModal,
    referenceKey,
    noteReferenceKey,
  };
};
export const selectShowStudentRemove = state => state.show.studentRemoveButton;

export const findStudent = (state, id) =>
  state.students.find(student => student.id === id) || {};
export const findTimetable = (state, id) =>
  state.timetables.find(timetable => timetable.id === id) || {};
export const findLesson = (state, id) =>
  state.lessons.find(lesson => lesson.id === id) || {};
export const findReservation = (state, id) =>
  state.reservations.find(resv => resv.id === id) || {};
export const filterMemberships = (state, id) =>
  state.memberships.filter(mbshp => mbshp.uid === id) || [];
export const filterSubscriptions = (state, id) =>
  state.subscriptions.filter(subs => subs.uid === id) || [];
export const filterTickets = (state, id) =>
  state.tickets.filter(ticket => ticket.uid === id) || [];
export const filterReservations = (state, id) =>
  state.reservations.filter(rsvn => rsvn.uid === id) || [];
export const filterPayments = (state, id) =>
  state.payments.filter(payment => payment.uid === id) || [];
