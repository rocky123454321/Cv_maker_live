import { StyleSheet } from "@react-pdf/renderer";
export const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 36,
    fontSize: 11,
    fontFamily: 'Times-Roman',
    lineHeight: 1.2,
  },

  section: {
    marginBottom: 8,
  },

  nameHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
    textTransform: 'uppercase',
  },

  contactInfo: {
    textAlign: 'center',
    marginBottom: 10,
  },

  subHeader: {
    fontSize: 12,
    marginBottom: 1,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 2,
  },

  entryTitle: {
    fontWeight: 'bold',
    marginBottom: 1,
  },

  entryDetails: {
    marginBottom: 1,
  },

  bullet: {
    marginLeft: 10,
    marginBottom: 1,
    lineHeight: 1.2,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },

  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
});
