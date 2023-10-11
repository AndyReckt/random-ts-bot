import { Colors, EmbedBuilder } from "discord.js";

/**
 * Template for success messages
 */
const success = () =>
    new EmbedBuilder().setColor(Colors.Green).setTitle("Successful");

/**
 * Template for error messages
 */
const error = () => new EmbedBuilder().setColor(Colors.Red).setTitle("Error");

export default {
    success,
    error,
};
